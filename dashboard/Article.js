'use strict';

var ProseArticle = require('substance/packages/prose-editor/ProseArticle');
var ArticleSchema = require('./ArticleSchema');

function Article() {
  Article.super.call(this, Article.static.schema);

  this.create({
    id: 'meta',
    type: 'meta',
    title: '',
    abstract: ''
  });
}

ProseArticle.extend(Article);

Article.static.schema = new ArticleSchema();

module.exports = Article;
