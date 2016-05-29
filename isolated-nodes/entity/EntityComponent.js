'use strict';

var BlockNodeComponent = require('substance/ui/BlockNodeComponent');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');

function EntityComponent() {
  EntityComponent.super.apply(this, arguments);
}

EntityComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-entity');

    el.append(
      $$('div').ref('title').addClass('se-title').append('Entity')
    );

    var table = $$('table');
    table.append(
      $$('colgroup').append(
        $$('col').addClass('se-label-col'),
        $$('col').addClass('se-value-col')
      )
    );

    var nameRow = $$('tr');
    nameRow.append($$('td').addClass('se-label').append('Name:'));
    nameRow.append($$('td').addClass('se-value').append(
      $$(TextPropertyEditor, {
        path: [this.props.node.id, 'name'],
        disabled: this.props.disabled
      }).ref('nameEditor')
    ));
    table.append(nameRow);

    table.append($$('tr').addClass('se-separator'))

    var descriptionRow = $$('tr');
    descriptionRow.append($$('td').addClass('se-label').append('Description:'));
    descriptionRow.append($$('td').addClass('se-value').append(
      $$(TextPropertyEditor, {
        path: [this.props.node.id, 'description'],
        disabled: this.props.disabled
      }).ref('descriptionEditor')
    ));
    table.append(descriptionRow);

    el.append(table);

    return el;
  };

};

BlockNodeComponent.extend(EntityComponent);

module.exports = EntityComponent;
