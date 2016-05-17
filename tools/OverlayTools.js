'use strict';

var Component = require('substance/ui/Component');

function OverlayTools() {
  Component.apply(this, arguments);
}

OverlayTools.Prototype = function() {

  this.didMount = function() {
    this.context.toolManager.registerComponent(this);
  };

  this.dispose = function() {
    this.context.toolManager.unregisterComponent(this);
  };

  this.render = function($$) {
    var el = $$('div').addClass('sc-overlay-tools').append(
      'OVERLAY TOOLS GO HERE'
    );
    return el;
  };
};

Component.extend(OverlayTools);

module.exports = OverlayTools;
