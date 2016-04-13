'use strict';

var Component = require('substance/ui/Component');
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

  // Listen to updates of the 'done' property and trigger a rerender if changed
  this.didMount = function() {
    var node = this.props.node;
    node.on('done:changed', this.rerender, this);
  };

  // Unbind event handlers
  this.dispose = function() {
    var node = this.props.node;
    node.off(this);
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

  this.render = function($$) {
    var el = $$('div')
      .addClass("sc-todo")
      .attr("data-id", this.props.node.id);

    if (this.props.node.done) {
      el.addClass('sm-done');
    }

    // Checkbox defining wheter a todo is done or not. We don't want the cursor
    // to move inside this area,so we set contenteditable to false
    var checkbox = $$('span').addClass('se-done')
      .attr({contenteditable: false})
      .append(
        $$(Icon, {icon: this.props.node.done ? "fa-check-square-o" : "fa-square-o"})
      )
      .on('mousedown', this.toggleDone);

    el.append(
      checkbox,
      // TextProperty is used to render annotated content.
      // It takes a doc and a path to a text property as an input.
      $$(TextProperty, {
        doc: this.props.doc,
        path: [this.props.node.id, "content"]
      })
    );
    return el;
  };
};

Component.extend(TodoComponent);

module.exports = TodoComponent;
