'use strict';

var Highlight = require('./Highlight');

module.exports = {
  name: 'highlight',
  configure: function(config) {
    config.addNode(Highlight);
  }
};
