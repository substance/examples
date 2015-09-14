var Substance = require("substance");
var Article = require('substance/article');

var TEST_DOCUMENT = [
  '<p>Hello world.</p>',
  '<h1>Heading 1</h1>',
  '<p>Lorem ipsum.</p>',
  '<h2>Heading 2</h2>'
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
    // The problem was, that there was another setProps while
    // the initial render was running - leading to a double trigger of didMount
    // need to make it more robust in this regard
    setTimeout(function() {
      cb(null, doc);
    });
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