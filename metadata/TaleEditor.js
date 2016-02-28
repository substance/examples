var merge = require('lodash/merge');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');

var config = {
  controller: {
    commands: [
      require('./MetaDataCommand')
    ]
  }
};

function TaleEditor() {
  ProseEditor.apply(this, arguments);
}
ProseEditor.extend(TaleEditor);
merge(TaleEditor.static.config, config);

module.exports = TaleEditor;