'use strict';

var Component = require('substance/ui/Component');

function OverlayContent() {
  Component.apply(this, arguments);
}

OverlayContent.Prototype = function() {
  this.render = function($$) {
    var el = $$('div').addClass('sc-overlay-content');
    return el;
  };
};

Component.extend(OverlayContent);

module.exports = OverlayContent;
