'use strict';

var Document = require('substance/model/Document');
var ProseArticle = require('substance/packages/prose-editor/ProseArticle');
var makeFixture = require('./fixture');

var TaleSchema = ProseArticle.schema;
TaleSchema.addNode(require('./metadata.js'));

var Tale = function() {
  Document.call(this, TaleSchema);

  this.create({
    type: 'container',
    id: 'body',
    nodes: []
  });
};

Tale.Prototype = function() {
	this.loadSample = function(){
		makeFixture(this);
	};
};

ProseArticle.extend(Tale);
Tale.schema = TagsSchema;

module.exports = Tale;