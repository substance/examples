'use strict';

var ControllerCommand = require('substance/ui/ControllerCommand');

function MetaData() {
  MetaData.super.apply(this, arguments);
}

MetaData.Prototype = function() {
  this.getCommandState = function() {
    return {
      showModal: false
    };
  };
  this.execute = function() {
    return true;
  };
};

ControllerCommand.extend(MetaData);

ControllerCommand.static.name = 'metadata';

module.exports = MetaData;