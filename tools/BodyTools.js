'use strict';

var Component = require('substance/ui/Component');

function BodyTools() {
  Component.apply(this, arguments);
}

BodyTools.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-overlay-tools');
    var commandStates = this.props.commandStates;

    // TODO: Activate link url editing
    if (commandStates['link'].mode === 'edit') {
      el.push(
        $$(EditLinkTool, clone(toolState.link))
      );
    }
    return el;
  };
};

Component.extend(BodyTools);


module.exports = BodyTools;
