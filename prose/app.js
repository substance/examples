'use strict';

var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var example = require('substance/test/fixtures/collab/poem');

var config = ProseEditor.static.mergeConfig(ProseEditor.static.config, {
  components: {
    'image': require('substance/packages/image/ImageComponent')
  },
  commands: [
    require('substance/packages/image/ImageCommand')
  ],
  surfaces: {
    body: {
      commands: ['image']
    }
  },
  tools: [
    {
      component: require('substance/packages/image/ImageTool'),
      icon: 'fa-image'
    }
  ]
});


function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('app');
    el.append($$(ProseEditor, {
      doc: this.props.doc,
      config: config
    }));
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
