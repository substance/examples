'use strict';

var HTMLExporter = require('substance/model/HTMLExporter');
var converters = require('./NoteImporter').converters;

function NoteExporter() {
  NoteExporter.super.call(this, {
    converters: converters,
    containerId: 'body'
  });
}

NoteExporter.Prototype = function() {
  this.convertDocument = function(doc) {
    var body = doc.get('body');
    var elements = this.convertContainer(body, this.state.containerId);
    var out = elements.map(function(el) {
      return el.outerHTML;
    });
    return out.join('');
  };
};

HTMLExporter.extend(NoteExporter);

module.exports = NoteExporter;