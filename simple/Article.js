'use strict';

var Document = require('substance/model/Document');
var DocumentSchema = require('substance/model/DocumentSchema');

var schema = new DocumentSchema('ghost-writer', '1.0.0');
schema.getDefaultTextType = function() {
  return 'paragraph';
};

schema.addNodes([
  require('substance/packages/paragraph/Paragraph'),
  require('substance/packages/heading/Heading'),
  require('substance/packages/codeblock/Codeblock'),
  require('substance/packages/blockquote/Blockquote'),
  require('substance/packages/image/Image'),
  require('substance/packages/emphasis/Emphasis'),
  require('substance/packages/strong/Strong'),
  require('substance/packages/link/Link'),
]);

var Article = function() {
  Document.call(this, schema);

  this.create({
    type: 'container',
    id: 'body',
    nodes: []
  });
};

Document.extend(Article);
Article.schema = schema;

module.exports = Article;
