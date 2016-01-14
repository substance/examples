# Converter

Substance allows you to build custom converters for your model. This example implements a [Note](../note) importer and exporter.

- [NoteImporter.js](NoteImporter.js) - Importer entry point
- [TodoHTMLConverter.js](TodoHTMLConverter.js) - DOM conversion for Todo nodes
- [MarkHTMLConverter.js](MarkHTMLConverter.js) - DOM conversion for Mark nodes
- [testNoteImporter.js](testNoteImporter.js) - Usage of the importer

*The NoteImporter and NoteExporter classes are used in the [Notepad](../notepad) example.*

Run and play with the importer test script:

```
node testNodeImporter.js
```

For testing the exporter run:

```
node testNodeExporter.js
```

### Mark HTML Converter

We want marks to be represented in HTML using a `mark` tag.

```html
<p>Some <mark>marked</mark> text</p>
```

In order to support this we need to setup a very simple converter for annotations.

```js
// From MarkHTMLConverter.js
module.exports = {
  type: 'mark',
  tagName: 'mark'
};
```

### Todo HTML Converter

For Todos we use the following HTML representation.

```html
<div class="todo" data-done="1">Fix bug</div>
```

In order to make this work we need to define mappings between HTML and the in-memory representation. This is pretty straight forward. We use an abstract [DOMElement](http://substance.io/docs/master/#contextId=toc,nodeId=ui/DOMElement) interface which has a similar API to jQuery. This allows you to execute converter code on the server too. The following code is used to `import` and `export` a Todo from and to HTML.

```js
// From TodoHTMLConverter.js
module.exports = {
  type: 'todo',
  tagName: 'div',

  matchElement: function(el) {
    return el.is("div") && el.hasClass('todo');
  },

  import: function(el, node, converter) {
    node.content = converter.annotatedText(el, [node.id, 'content']);
    node.done = el.attr('data-done') === '1';
  },

  export: function(node, el, converter) {
    el.append(converter.annotatedText([node.id, 'content']))
      .addClass('todo')
      .attr('done', node.done ? '1': '0');
  }
};
```
