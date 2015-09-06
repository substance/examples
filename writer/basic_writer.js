'use strict';

var Substance = require('substance');
var OO = Substance.OO;
var Writer = require("substance/ui/writer");

var components = require('./components');
var stateHandlers = require('./state_handlers');

function BasicWriter(parent, params) {
  params.props.config = {
    containerId: 'body',
    components: components,
    stateHandlers: stateHandlers
  };
  Writer.call(this, parent, params);
}

OO.inherit(BasicWriter, Writer);

module.exports = BasicWriter;