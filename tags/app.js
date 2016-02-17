'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var TagsTool = require('./tags/TagsTool');
var example = require('substance/test/fixtures/collab/poem');
var $$ = Component.$$;

var config = {
  i18n: {
    'tags.title': 'Tags'
  },
  controller: {
    components: {
      'tags': require('./tags/TagsComponent')
    }
  },
  bodyEditor: {
    commands: [
      require('./tags/TagsCommand')
    ]
  }
};

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('app');

    var editor = $$(ProseEditor, {
      doc: this.props.doc,
      config: config
    });
    editor.outlet('tools').append(
      $$(TagsTool).append($$(Icon, {icon: 'fa-tags'}))
    );

    el.append(editor);

    return el;
  };
};

Component.extend(App);

$(function() {
  var doc = example.createArticle();
  // For debugging in the console
  window.doc = doc;
  Component.mount(App, {
    doc: doc
  }, 'body');
});
