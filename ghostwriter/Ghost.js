'use strict';

var oo = require('substance/util/oo');
var insertText = require('substance/model/transform/insertText');
var deleteSelection = require('substance/model/transform/deleteSelection');

var words = [
  "Fair river in thy bright, clear flow",
  "Of crystal wandering water,",
  "Thou art an emblem of the glow",
  "Of beauty the unhidden heart",
  "The playful maziness of art",
  "In old Alberto's daughter;",
  "\n",
  "But when within thy wave she looks",
  "Which glistens then, and trembles",
  "Why, then, the prettiest of brooks",
  "Her worshipper resembles",
  "For in my heart, as in thy stream,",
  "Her image deeply lies",
  "The heart which trembles at the beam",
  "Of her soul-searching eyes."
].join("\n").split(' ');

function Ghost(surface) {

  this.surface = surface;
  this.state = null;

  // binding this method for convenience
  this._step = this._step.bind(this);

  this._words = words;
  this._inputPos = -1;
}

Ghost.Prototype = function() {

  this.start = function() {
    this.state = "select";
    this._stopped = false;
    this.step();
  };

  this.step = function() {
    if (this._stopped) return;
    switch(this.state) {
      case "select":
        this.select();
        break;
      case "write":
        this.writeWord();
        break;
      case "delete":
        this.deleteSelection();
        break;
    }
    var delay;
    if (this.state === "select") {
      delay = 2000;
    } else if (this.state === "write") {
      delay = 1000;
    } else {
      delay = 300;
    }
    setTimeout(this._step, delay);
  };

  this._step = function() {
    this.switchAction();
    this.step();
  };

  this.switchAction = function() {
    var r = Math.random();
    switch(this.state) {
      case "select":
        if (r < 0.6) {
          this.state = "write";
        } else {
          this.state = "delete";
        }
        break;
      case "write":
        if (r > 0.8) {
          this.state = "select";
        } else if (r > 0.7) {
          this.state = "delete";
        }
        break;
      case "delete":
        if (r > 0.8) {
          this.state = "select";
        }
        break;
      default:
        this.state = "select";
    }
    // console.log('switching action from ', oldState, 'to', this.state);
  };

  this.select = function() {
    this._setRandomSelection();
    this._setRandomInputPos();
  };

  this._setRandomSelection = function() {
    var doc = this.getDocument();
    var container = doc.get('body');

    // var i;
    // var sum = 0;
    // var lengths = [];
    // var nodeIds = container.nodes;
    // for (i = 0; i < nodeIds.length; i++) {
    //   var l = doc.get(nodeIds[i]).content.length;
    //   sum += l;
    //   lengths[i] = sum;
    // }
    // var r = Math.random();
    // var randomIdx = -1;
    // for (i = 0; i < lengths.length; i++) {
    //   if (r < lengths[i]/sum) {
    //     randomIdx = i;
    //     break;
    //   }
    // }
    var randomIdx = 2;

    var path = [container.nodes[randomIdx], 'content'];
    var content = doc.get(path);
    var startPos = Math.floor(Math.random() * content.length);
    var endPos = Math.min(content.length, startPos + Math.floor(Math.random() * 10));

    this.setSelection(doc.createSelection({
      type: 'property',
      path: path,
      startOffset: startPos,
      endOffset: endPos
    }));
  };

  this._setRandomInputPos = function() {
    this._inputPos = Math.floor(Math.random() * this._words.length);
  };

  this.deleteSelection = function() {
    if (!this.surface.getSelection().isNull()) {
      this.surface.transaction(function(tx, args) {
        return deleteSelection(tx, args);
      });
    }
  };

  this.writeWord = function() {
    while (this._inputPos < 0 || this._inputPos >= this._words.length) {
      this._setRandomInputPos();
    }
    var word = this._words[this._inputPos];
    this.surface.transaction(function(tx, args) {
      args.text = " " + word;
      return insertText(tx, args);
    });
    this._inputPos++;
  };

  this.getDocument = function() {
    return this.surface.getDocument();
  };

  this.setSelection = function(sel) {
    this.surface.setSelection(sel);
  };

};

oo.initClass(Ghost);

module.exports = Ghost;
