'use strict';

var DocumentSession = require('substance/model/DocumentSession');
var Component = require('substance/ui/Component');
var ToolsExample = require('./ToolsExample');
var loremIpsum = require('./loremIpsum');

window.onload = function() {
  var doc = loremIpsum.createArticle();
  var documentSession = new DocumentSession(doc);
  // For debugging in the console
  window.doc = doc;
  Component.mount(ToolsExample, {
    documentSession: documentSession
  }, document.body);
};
