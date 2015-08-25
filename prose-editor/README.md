# Prose Editor

The most basic Substance integration.

```js
var $ = window.$ = require('jquery');
var Editor = require('substance/ui/editor');
var Component = require('substance/ui/component');
var $$ = Component.$$;

$(function() { 
  var proseEditor = Component.mount($$(Editor, {
    content: '<p>hello world</p>'
  }), $('#editor_container'));

  // To retrieve the edited content
  console.log(proseEditor.getContent());
});
```