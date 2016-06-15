'use strict';

var Component = require('substance/ui/Component');

function InlineImage() {
  InlineImage.super.apply(this, arguments);
}

InlineImage.Prototype = function() {

  this.didMount = function() {
    this.props.node.on('src:changed', this.rerender, this);
  };

  this.dispose = function() {
    this.props.node.off(this);
  };

  this.render = function($$) {
    var el = $$('img')
      .attr('src', this.props.node.src)
      .addClass('sc-inline-image');
    return el;
  };

};

Component.extend(InlineImage);

module.exports = InlineImage;
