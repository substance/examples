'use strict';

var DocumentSession = require('substance/model/DocumentSession');
var Component = require('substance/ui/Component');
var Notepad = require('./Notepad');
var NoteImporter = require('../converter/NoteImporter');
var importer = new NoteImporter();

window.onload = function() {
  var containerEl = window.document.querySelector('#editor_container');
  var htmlContent = containerEl.innerHTML;
  containerEl.innerHTML = "";
  var doc = importer.importDocument(htmlContent);
  var documentSession = new DocumentSession(doc);
  // For debugging in the console
  window.doc = doc;
  Component.mount(Notepad, {
    documentSession: documentSession
  }, containerEl);
};
