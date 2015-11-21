'use strict';

var oo = require('substance/util/oo');
var Document = require('substance/model/Document');
var noteSchema = require('./noteSchema');

/**
  Note article class
*/
var Note = function(schema) {
  Document.call(this, schema || noteSchema);

  // Holds a sequence of node ids
  this.create({
    type: 'container',
    id: 'body',
    nodes: []
  });
};

Document.extend(Note)
Note.schema = noteSchema;

module.exports = Note;
