'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var TablePackage = require('substance/packages/table/TablePackage');

module.exports = {
  name: 'table-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(TablePackage);
    config.addStyle(__dirname+'/app.scss');
  }
};
