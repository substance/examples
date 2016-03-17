'use strict';

var Component = require('substance/ui/Component');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var SplitPane = require('substance/ui/SplitPane')
var $$ = Component.$$;

function ArticleEditor() {
  ArticleEditor.super.apply(this, arguments);
}

ArticleEditor.Prototype = function() {
  var _super = Object.getPrototypeOf(this);

  this.render = function() {
    var el = _super.render.apply(this, arguments);
    // ingesting an editable cover node
    // HACK: retrieving the contentPanel in a dangerous way
    // TODO: it would be great to have access to the virtual elements via ref
    // already
    var contentPanel = el.children[0].children[1];
    if (contentPanel._ref !== 'contentPanel') {
      throw new Error('Assertion failed.');
    }

    var cover = $$('div').addClass('se-cover').ref('cover');
    cover.append($$(TextPropertyEditor, {
      name: 'title',
      path: ['meta', 'title']
    }).addClass('se-title-editor'));
    cover.append($$(TextPropertyEditor, {
      name: 'abstract',
      path: ['meta', 'abstract']
    }).addClass('se-abstract-editor'));
    contentPanel.insertAt(0, cover);

    return el;
  };

};

ProseEditor.extend(ArticleEditor);

module.exports = ArticleEditor;
