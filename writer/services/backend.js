var Substance = require("substance");
var Article = require('substance/article');

var TEST_DOCUMENT = [
  '<p>Hello world.</p>',
  '<p>Lorem ipsum.</p>',
].join('\n');

var Backend = function() {

};

Backend.Prototype = function() {

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    var doc = new Article();
    doc.loadHtml(TEST_DOCUMENT);
    window.doc = doc;
    cb(null, doc);
  };

  this.saveDocument = function(doc, cb) {
    cb('Not supported in dev version');
  };

  // Figure related
  // ------------------

  // this.uploadFigure = function(file, cb) {
  //   // This is a fake implementation
  //   var objectURL = URL.createObjectURL(file);
  //   cb(null, objectURL);
  // };
};

Substance.initClass(Backend);

module.exports = Backend;