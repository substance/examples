'use strict';

var oo = require('substance/util/oo');
var Component = require('substance/ui/Component');
var $$ = Component.$$;
var TextProperty = require('substance/ui/TextPropertyComponent');
var Icon = require('substance/ui/FontAwesomeIcon');

// Todo Component
// -----------------
// 
// Acts like a paragraph but displays a checkbox on the left that can be toggled.

function TodoComponent() {
  Component.apply(this, arguments);
}

TodoComponent.Prototype = function() {

  this.getClassNames = function() {
    return "content-node todo";
  };

  this.toggleDone = function(e) {
    e.preventDefault();
    var node = this.props.node;
    var surface = this.context.surface;

    // A Surface transaction performs a sequence of document operations
    // and also considers the active selection.
    surface.transaction(function(tx) {
      tx.set([node.id, "done"], !node.done);
    });
  };

  this.render = function() {
    // Checkbox defining wheter a todo is done or not. We don't want the cursor
    // to move inside this area,so we set contenteditable to false
    var checkbox = $$('span').addClass('done').attr({contenteditable: false}).append(
      $$(Icon, {icon: this.props.node.done ? "fa-check-square-o" : "fa-square-o"})
    );
    checkbox.on('mousedown', this.toggleDone);

    var el = $$('div')
      .addClass(this.getClassNames())
      .attr("data-id", this.props.node.id)
      .append([
        checkbox,
        // TextProperty is used to render annotated content.
        // It takes a doc and a path to a text property as an input.
        $$(TextProperty, {
          doc: this.props.doc,
          path: [ this.props.node.id, "content"]          
        })
      ]);

    if (this.props.node.done) {
      el.addClass('done');
    }
    return el;
  };

  // Listen to updates of the 'done' property and trigger a rerender if changed
  this.didMount = function() {
    var node = this.props.node;
    this.doc = node.getDocument();
    this.doc.getEventProxy('path').add([node.id, 'done'], this, this.rerender);
  };

  // Unbind event handlers
  this.willUnmount = function() {
    this.doc.getEventProxy('path').remove([this.props.node.id, 'done'], this);
  };
};

oo.inherit(TodoComponent, Component);

module.exports = TodoComponent;
