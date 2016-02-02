'use strict';

var oo = require('substance/util/oo');
var insertText = require('substance/model/transform/insertText');

function InsertChar(surface) {
  this.surface = surface;
  this.state = 'select';
}

InsertChar.Prototype = function() {

  this.execute = function() {
    switch(this.state) {
      case "select":
        this.select();
        break;
      case "write":
        this.writeChar();
        break;
    }
    var delay;
    if (this.state === "select") {
      delay = 2000;
    } else if (this.state === "write") {
      delay = 1000;
    }
    return delay;
  };

  this.switchAction = function() {
    switch(this.state) {
      case "select":
        this.state = "write";
        break;
    }
  };

  this.select = function() {
    var doc = this.surface.getDocument();
    this.surface.setSelection(doc.createSelection({
      type: 'property',
      path: ['p1', 'content'],
      startOffset: 1,
      endOffset: 1
    }));
  };

  this.writeChar = function() {
    this.surface.transaction(function(tx, args) {
      args.text = "X";
      return insertText(tx, args);
    });
  };

};

oo.initClass(InsertChar);

module.exports = InsertChar;
