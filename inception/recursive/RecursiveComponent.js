'use strict';

var Component = require('substance/ui/Component');
var ContainerEditor = require('substance/ui/ContainerEditor');

function RecursiveContainerComponent() {
  RecursiveContainerComponent.super.apply(this, arguments);
}

RecursiveContainerComponent.Prototype = function() {

  this.shouldRerender = function() {
    return false;
  };

  this.render = function($$) {
    var doc = this.props.node.getDocument();
    var el = $$('div').addClass('sc-container');
    var body = doc.get('body');

    var level = 0;
    var surfaceParent = this.context.surfaceParent;
    if (surfaceParent._isIsolatedNodeComponent) {
      level = surfaceParent._getLevel();
    }

    if (level < 7) {
      el.append(
        $$(ContainerEditor, {
          name: this.props.node.id,
          node: body
        }).ref('editor')
      );
    } else {
      el.append($$('img').attr({
        src: 'http://www.indiewire.com/wp-content/uploads/2014/05/the-terminator.jpg?w=780',
        title: 'The Terminator',
        alt: 'The Terminator'
      }));
    }
    return el;
  };

};

Component.extend(RecursiveContainerComponent);

RecursiveContainerComponent.static.fullWidth = true;

module.exports = RecursiveContainerComponent;
