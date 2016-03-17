'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function ArticleMeta() {
  ArticleMeta.super.apply(this, arguments);
}

DocumentNode.extend(ArticleMeta);

ArticleMeta.static.name = "meta";

ArticleMeta.static.defineSchema({
  title: 'text',
  abstract: 'text'
});

module.exports = ArticleMeta;
