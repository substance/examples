'use strict';

var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
// var InsertTableTool = require('substance/packages/table/InsertTableTool');

var InsertImageTool = require('substance/packages/image/ImageTool');

var example = require('substance/test/fixtures/collab/poem');

var config = ProseEditor.static.mergeConfig(ProseEditor.static.config, {
  controller: {
    components: {
      // 'table': require('substance/packages/table/TableComponent')
      'image': require('substance/packages/image/ImageComponent')
    }
  },
  bodyEditor: {
    commands: [
      // require('substance/packages/table/InsertTableCommand')
      require('substance/packages/image/ImageCommand')
    ]
  }
});

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('app');

    var editor = $$(ProseEditor, {
      doc: this.props.doc,
      config: config
    });
    editor.outlet('tools').append(
      // $$(InsertTableTool).append($$(Icon, {icon: 'fa-table'}))
      $$(InsertImageTool).append($$(Icon, {icon: 'fa-image'}))
    );

    el.append(editor);

    return el;
  };
};

Component.extend(App);

window.onload = function() {
  var doc = example.createArticle();
  // For debugging in the console
  window.doc = doc;
  Component.mount(App, { doc: doc }, 'body');
};
