'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var Notepad = require('./Notepad');
var NoteImporter = require('../converter/NoteImporter');
var importer = new NoteImporter();

$(function() {
  var $container = $('#editor_container');
  var htmlContent = $container.html();
  $container.empty();
  var doc = importer.importDocument(htmlContent);

  // For debugging in the console
  window.doc = doc;
  Component.mount(Notepad, {
    doc: doc
  }, $container[0]);
});