'use strict';

var HTMLImporter = require('substance/model/HTMLImporter');
var noteSchema = require('../note/noteSchema');
var Note = require('../note/Note');

var converters = [
  require('substance/packages/paragraph/ParagraphHTMLConverter'),
  require('substance/packages/blockquote/BlockquoteHTMLConverter'),
  require('substance/packages/codeblock/CodeblockHTMLConverter'),
  require('substance/packages/heading/HeadingHTMLConverter'),
  require('substance/packages/strong/StrongHTMLConverter'),
  require('substance/packages/emphasis/EmphasisHTMLConverter'),
  require('substance/packages/link/LinkHTMLConverter'),
  require('./MarkHTMLConverter'),
  require('./TodoHTMLConverter')
];

function NoteImporter() {
  NoteImporter.super.call(this, {
    schema: noteSchema,
    converters: converters,
    DocumentClass: Note
  });
}

NoteImporter.Prototype = function() {
  this.convertDocument = function(els) {
    this.convertContainer(els, 'body');
  };
};

// Expose converters so we can reuse them in NoteHtmlExporter
NoteImporter.converters = converters;

HTMLImporter.extend(NoteImporter);
module.exports = NoteImporter;