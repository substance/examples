var Substance = require('substance');

var ArticleMeta = Substance.Document.Node.extend({
  name: "meta",
  properties: {
    "title": "string",
    "abstract": "string"
  }
});

/*
<meta>
  <title>The <em>Substance</em> Article Format</title>
  <abstract>Article abstract with <strong>annotations</strong></abstract>
</meta>
*/

ArticleMeta.static.matchElement = function($el) {
  return $el.is('meta');
};

ArticleMeta.static.fromHtml = function($el, converter) {
  var id = 'meta';
  var meta = {
    id: id,
    title: "",
    abstract: "",
  };
  var $title = $el.find('title');
  if ($title.length) {
    meta.title = converter.annotatedText($title, [id, 'title']);
  } else {
    converter.warning('Meta: no title found.');
  }
  var $abstract = $el.find('abstract');
  if ($abstract.length) {
    meta.abstract = converter.annotatedText($abstract, [id, 'abstract']);
  } else {
    converter.warning('Meta: no abstract found.');
  }

  return meta;
};

ArticleMeta.static.toHtml = function(articleMeta, converter) {
  var id = articleMeta.id;
  var $el = $('<meta>');

  var $title = $('<title>')
    .append(converter.annotatedText([id, 'title']));

  var $abstract = $('<abstract>')
    .append(converter.annotatedText([id, 'abstract']));
    
  return $el.append($title, $abstract);
};

module.exports = ArticleMeta;