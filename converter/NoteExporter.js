'use strict';

var HTMLExporter = require('substance/model/HTMLExporter');
var converters = require('./NoteImporter').converters;

function NoteExporter() {
  NoteExporter.super.call(this, {
    converters: converters,
    containerId: 'body'
  });
}

HTMLExporter.extend(NoteExporter);

module.exports = NoteExporter;