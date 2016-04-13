'use strict';

var Component = require('substance/ui/Component');

function AlienComponent() {
  AlienComponent.super.apply(this, arguments);
}

AlienComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-alien');
    el.append(
      $$('img').attr('height', 100).attr('src', 'alien/alien.svg')
    );
    if (this.props.node.mood) {
      el.addClass('sm-' + this.props.node.mood);
    }

    var overlay = $$('div').addClass('se-overlay')
      .append($$('button').append('Click Here').on('click', this.onClick));
    el.append(overlay);

    return el;
  };

  this.getDocument = function() {
    return this.props.node.getDocument();
  };

  this.didMount = function() {
    // TODO: improve this API by introducing a proxy on the node itself
    this.getDocument().getEventProxy('path').connect(this, [this.props.node.id, 'mood'], this.onChange);
  };

  this.dispose = function() {
    this.getDocument().getEventProxy('path').disconnect(this);
  };

  var _moods = ['normal', 'angry', 'excited', 'sad', 'sick'];

  this.onClick = function(event) {
    event.preventDefault();
    event.stopPropagation();

    var surface = this.context.surface;
    var node = this.props.node;

    var mood = node.mood || 'normal';
    var idx = _moods.indexOf(mood);
    idx = (idx+1) % _moods.length;
    mood = _moods[idx];
    surface.transaction(function(tx) {
      tx.set([node.id, 'mood'], mood);
    });
    this.rerender();
  };

  this.onChange = function() {
    this.rerender();
  };

};

Component.extend(AlienComponent);

module.exports = AlienComponent;
