'use strict';

var DocumentSession = require('substance/model/DocumentSession');
var Component = require('substance/ui/Component');
var ToolsExample = require('./ToolsExample');

var twoParagraphs = require('substance/test/fixtures/collab/two-paragraphs');

window.onload = function() { 
  var doc = twoParagraphs.createArticle();
  var documentSession = new DocumentSession(doc);
  // For debugging in the console
  window.doc = doc;
  Component.mount(ToolsExample, {
    documentSession: documentSession
  }, document.body);
};
