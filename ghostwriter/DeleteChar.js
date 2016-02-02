'use strict';

var oo = require('substance/util/oo');
var deleteCharacter = require('substance/model/transform/deleteCharacter');

function DeleteChar(surface) {
  this.surface = surface;
  this.state = 'select';
}

DeleteChar.Prototype = function() {

  this.execute = function() {
    switch(this.state) {
      case "select":
        this.select();
        break;
      case "delete":
        this.deleteChar();
        break;
    }
    var delay = 1000;
    if (this.state === "select") {
      delay = 2000;
    }
    return delay;
  };

  this.switchAction = function() {
    switch(this.state) {
      case "select":
        this.state = "delete";
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

  this.deleteChar = function() {
    this.surface.transaction(function(tx, args) {
      return deleteCharacter(tx, args);
    });
  };

};

oo.initClass(DeleteChar);

module.exports = DeleteChar;
