var merge = require('lodash/merge');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');

var config = {
  i18n: {
    'tags.title': 'Tags'
  },
  controller: {
    components: {
      'tags': require('./tags/TagsComponent')
    }
  },
  bodyEditor: {
    commands: [
      require('./tags/TagsCommand')
    ]
  }
};

function TagsEditor() {
  ProseEditor.apply(this, arguments);
}
ProseEditor.extend(TagsEditor);
merge(TagsEditor.static.config, config);

module.exports = TagsEditor;