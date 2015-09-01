var Editor = require('substance/ui/editor');
var Note = require('./note');
var Toolbar = require('./toolbar');

// Configure custom Notepad editor
// ----------------------
// 
// Supports only paragraphs, but a custom mark annotation
// to highlight important fragments in the note.

var Notepad = Editor.extend({
  config: {
    article: Note,
    toolbar: Toolbar,
    components: {
      "paragraph": require('substance/ui/nodes/paragraph_component'),
      "link": require('substance/ui/nodes/link_component'),
      "todo": require('./todo_component')
    }
  }
});

module.exports = Notepad;