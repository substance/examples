'use strict';

var Component = require('substance/ui/Component');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');

function EntityComponent() {
  EntityComponent.super.apply(this, arguments);
}

EntityComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-entity').attr('data-id', this.props.node.id);
    el.attr('contenteditable', false);

    var enabled = !!this.props.enabled;

    var nameEl = $$('div').ref('name').addClass('se-name');
    nameEl.append($$('div').ref('name.label').addClass('se-label').append('Name:'));
    nameEl.append($$(TextPropertyEditor, {
      enabled: enabled,
      path: [this.props.node.id, 'name']
    }).ref('nameEditor'));

    var descriptionEl = $$('div').ref('description').addClass('se-description');
    descriptionEl.append($$('div').ref('description.label').addClass('se-label').append('Description:'));
    descriptionEl.append($$(TextPropertyEditor, {
      enabled: enabled,
      path: [this.props.node.id, 'description']
    }).ref('descriptionEditor'));

    el.append(nameEl);
    el.append(descriptionEl);

    return el;
  };

  this.enable = function() {
    this.refs.nameEditor.enable();
    this.refs.descriptionEditor.enable();
  };

  this.disable = function() {
    this.refs.nameEditor.disable();
    this.refs.descriptionEditor.disable();
  };

};

Component.extend(EntityComponent);

EntityComponent.static.isPropertyEditor = true;

module.exports = EntityComponent;
