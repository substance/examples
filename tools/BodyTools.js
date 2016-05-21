'use strict';

var Component = require('substance/ui/Component');
var EditLinkTool = require('substance/packages/link/EditLinkTool');
var clone = require('lodash/lang/clone');

function BodyTools() {
  Component.apply(this, arguments);
}

BodyTools.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-body-tools');
    var commandStates = this.props.commandStates;

    if (commandStates['link'].mode === 'edit') {
      el.append(
        $$(EditLinkTool, clone(commandStates.link))
      );
    }
    return el;
  };
};

Component.extend(BodyTools);

module.exports = BodyTools;
