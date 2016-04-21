'use strict';

var BlockNodeComponent = require('substance/ui/BlockNodeComponent');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');
var Grid = require('substance/ui/Grid');

function EntityComponent() {
  EntityComponent.super.apply(this, arguments);
}

EntityComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-entity');

    el.append(
      $$('div').addClass('se-title').append('Entity')
    );

    var grid = $$(Grid, {
      columns: [2, 10]
    });
    grid.append(
      $$(Grid.Row).append(
        // TODO: Improve Grid API. The internal layout implementation needs to be known to the user
        $$(Grid.Cell).ref('nameLabel').append('Name:'),
        $$(Grid.Cell).append(
          $$(TextPropertyEditor, {
            path: [this.props.node.id, 'name'],
            disabled: this.props.disabled
          }).ref('nameEditor')
        )
      )
    );
    grid.append(
      $$(Grid.Row).append(
        $$(Grid.Cell).ref('descriptionLabel').append('Description:'),
        $$(Grid.Cell).append(
          $$(TextPropertyEditor, {
            path: [this.props.node.id, 'description'],
            disabled: this.props.disabled
          }).ref('descriptionEditor')
        )
      )
    );

    el.append($$('div').addClass('se-editor').append(grid));

    return el;
  };

};

BlockNodeComponent.extend(EntityComponent);

module.exports = EntityComponent;
