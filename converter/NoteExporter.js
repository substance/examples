'use strict';

var oo = require('substance/util/oo');
var HTMLExporter = require('substance/model/HTMLExporter');
var converters = require('./NoteImporter').converters;

function NoteExporter() {
  NoteExporter.super.call(this, {
    converters: converters,
    containerId: 'body'
  });
}

NoteExporter.Prototype = function() {};
oo.inherit(NoteExporter, HTMLExporter);
module.exports = NoteExporter;