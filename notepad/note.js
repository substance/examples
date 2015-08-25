'use strict';

var OO = require('substance/basics/oo');
var Document = require('substance/document');
var SubstanceArticle = require('substance/article');

// Custom node implementations
var Todo = require('./todo');
var Mark = require('./mark');

// Custom schema
// -----------------

var schema = new Document.Schema("substance-note", "1.0.0");
schema.getDefaultTextType = function() {
  return "paragraph";
};

schema.addNodes([
  Document.Paragraph,
  Document.Emphasis,
  Document.Strong,
  Document.Link,
  Todo,
  Mark
]);

// Article class definition
// -----------------

var Note = function() {
  SubstanceArticle.call(this, schema);
};

Note.Prototype = function() {

};

OO.inherit(Note, SubstanceArticle);

module.exports = Note;
