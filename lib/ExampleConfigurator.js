'use strict';

var DefaultConfigurator = require('substance/util/Configurator');

function ExampleConfigurator() {
  ExampleConfigurator.super.apply(this, arguments);
}

DefaultConfigurator.extend(ExampleConfigurator);

module.exports = ExampleConfigurator;
