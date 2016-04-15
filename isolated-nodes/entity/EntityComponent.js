'use strict';

var Component = require('substance/ui/Component');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');

function EntityComponent() {
  EntityComponent.super.apply(this, arguments);
}

EntityComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-entity')
    el.attr({
      'data-id': this.props.node.id,
      contenteditable: false
    });

    var documentSession = this.context.documentSession;
    var enabled = !!this.props.enabled;

    var nameEl = $$('div').ref('name').addClass('se-name');
    nameEl.append($$('div').ref('name.label').addClass('se-label').append('Name:'));
    nameEl.append($$(TextPropertyEditor, {
      path: [this.props.node.id, 'name'],
      enabled: enabled,
    }).ref('nameEditor'));

    var descriptionEl = $$('div').ref('description').addClass('se-description');
    descriptionEl.append($$('div').ref('description.label').addClass('se-label').append('Description:'));
    descriptionEl.append($$(TextPropertyEditor, {
      path: [this.props.node.id, 'description'],
      enabled: enabled
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
