'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var AlienPackage = require('./alien/AlienPackage');

module.exports = {
  name: 'focused-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(AlienPackage);
  }
};
