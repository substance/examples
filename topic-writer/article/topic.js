'use strict';

// Substance Article
// ----------------
// 
// The default Article Implementation
// 
// Uses well-defined HTML exchange representation

var Substance = require('substance');
var OO = require('substance/basics/oo');
var Document = require('substance/document');
var HtmlImporter = Document.HtmlImporter;
var HtmlExporter = Document.HtmlExporter;
var _ = require('substance/helpers');


var Meta = require('./nodes/meta');
var TopicCitation = require('./nodes/topic_citation');

var nodes = [
  Meta,
  TopicCitation,
  Document.Paragraph,
  Document.Blockquote,
  Document.Heading,
  Document.Emphasis,
  Document.Strong,
  Document.Link
];

// Default Schema
// ----------------

var defaultSchema = new Document.Schema("substance-topic", "1.0.0");

defaultSchema.getDefaultTextType = function() {
  return "paragraph";
};

defaultSchema.addNodes(nodes);

// Importer
// ----------------

function Importer(schema) {
  Importer.super.call(this, { schema: schema });
}

Importer.Prototype = function() {

  this.convert = function($rootEl, doc) {
    this.initialize(doc, $rootEl);

    var $meta = $rootEl.find('meta');
    if (!$meta.length) {
      throw new Error('meta is mandatory');
    }

    var $body = $rootEl.find('body');
    if (!$body.length) {
      throw new Error('body is mandatory');
    }

    this.meta($meta);
    this.body($body);
    this.finish();
  };

  this.meta = function($meta) {
    this.convertElement($meta);
  };

  this.body = function($body) {
    this.convertContainer($body, 'body');
  };
};

OO.inherit(Importer, HtmlImporter);

// Exporter
// ----------------

function Exporter(schema) {
  Exporter.super.call(this, { schema: schema });
}

Exporter.Prototype = function() {

  this.convert = function(doc, options) {
    this.initialize(doc, options);

    var $doc = this.createXmlDocument();
    var $article = $doc.find('article');
    
    $article.append(this.meta());
    $article.append(this.body());

    var res = new window.XMLSerializer().serializeToString($doc[0]);
    window.res = res;

    // jQuery requires us to have xmlns on the root element set to xhml
    // However that's wrong, so we change it to our own namespace
    // See: http://stackoverflow.com/questions/8084175/how-do-i-prevent-jquery-from-inserting-the-xmlns-attribute-in-an-xml-object
    res = res.replace('http://www.w3.org/1999/xhtml', 'http://substance.io/science-article/0.1.0');
    return res;
  };

  this.meta = function() {
    var doc = this.state.doc;
    var articleMeta = doc.get('meta');
    return articleMeta.toHtml(this);
  };

  this.body = function() {
    var doc = this.state.doc;
    var body = doc.get('body');
    var $body = $('<body>').append(this.convertContainer(body));
    return $body;
  };

};

OO.inherit(Exporter, HtmlExporter);


// Article Class
// ----------------

var Article = function(schema) {
  Document.call(this, schema || defaultSchema);
};

Article.Prototype = function() {

  this.initialize = function() {
    Document.prototype.initialize.apply(this, arguments);

    this.create({
      type: "container",
      id: "body",
      nodes: []
    });

    this.topicCitationIndex = this.addIndex('topicCitationIndex', Substance.Data.Index.create({
      type: "topic_citation",
      property: "target"
    }));
  };

  this.getTOCNodes = function() {
    var tocNodes = [];
    var contentNodes = this.get('body').nodes;
    _.each(contentNodes, function(nodeId) {
      var node = this.get(nodeId);
      if (node.type === "heading") {
        tocNodes.push(node);
      }
    }, this);
    return tocNodes;
  };

  this.toHtml = function() {
    return new Exporter(this.schema).convert(this);
  };

  // replaces the content by loading from the given XML file
  this.load = function(xml) {
    this.clear();

    // Re-enable transaction for the importing step
    this.FORCE_TRANSACTIONS = false;
    var $root = $(xml);
    new Importer(this.schema).convert($root, this);
    this.documentDidLoad();
  };
};

OO.inherit(Article, Document);
Article.schema = defaultSchema;

Article.Importer = Importer;
module.exports = Article;
