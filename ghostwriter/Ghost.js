'use strict';

var oo = require('substance/util/oo');
var DeleteWriteSelect = require('./DeleteWriteSelect');
var InsertChar = require('./InsertChar');
var DeleteChar = require('./DeleteChar');

function Ghost(surface) {
  this.surface = surface;
  this.strategy = new DeleteWriteSelect(surface);
  // this.strategy = new InsertChar(surface);
  // this.strategy = new DeleteChar(surface);
  // binding this method for convenience
  this._step = this._step.bind(this);
  this._running = false;
}

Ghost.Prototype = function() {

  this.start = function() {
    this._running = true;
    this.step();
  };

  this.stop = function() {
    this._running = false;
  };

  this.isRunning = function() {
    return this._running;
  };

  this.step = function() {
    if (!this._running) return;
    var delay = this.strategy.execute();
    setTimeout(this._step, delay);
  };

  this._step = function() {
    this.strategy.switchAction();
    this.step();
  };


};

oo.initClass(Ghost);

module.exports = Ghost;
