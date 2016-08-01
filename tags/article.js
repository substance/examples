'use strict';

var Document = require('substance/model/Document');
var ProseArticle = require('substance/packages/prose-editor/ProseArticle');
var makeFixture = require('./fixture');

var TagsSchema = ProseArticle.schema;
TagsSchema.addNode(require('./tags/Tags'));

var Article = function() {
  Document.call(this, TagsSchema);

  this.create({
    type: 'container',
    id: 'body',
    nodes: []
  });
};

Article.Prototype = function() {
	this.loadSample = function(){
		makeFixture(this);
	};
};

ProseArticle.extend(Article);
Article.schema = TagsSchema;

module.exports = Article;