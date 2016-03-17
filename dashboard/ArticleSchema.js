'use strict';

var ProseArticleSchema = require('substance/packages/prose-editor/ProseArticleSchema');
var ArticleMeta = require('./ArticleMeta');

function ArticleSchema() {
  ArticleSchema.super.call(this);

  this.addNode(ArticleMeta);
}

ProseArticleSchema.extend(ArticleSchema);

module.exports = ArticleSchema;