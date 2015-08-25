var TextNode = require('substance/document/text_node');

var Todo = TextNode.extend({
  name: "todo",
  properties: {
    done: "bool",
    content: "string"
  }
});

// HtmlImporter

Todo.static.blockType = true;

Todo.static.matchElement = function($el) {
  return $el.is('div') && $el.hasClass('todo');
};

Todo.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'todo');
  var todo = {
    id: id,
    content: '',
    done: $el.attr('data-done') === "1"
  };
  // Stores the plain text in the content property but also creates
  // annotation objects in the document instance.
  todo.content = converter.annotatedText($el, [id, 'content']);
  return todo;
};

// HtmlExporter
Todo.static.toHtml = function(todo, converter) {
  var id = todo.id;
  var $el = $('<div>')
    .addClass('todo')
    .attr('id', id)
    .attr('done', todo.done ? "1": "0");
  // Extracts annotated text from the content property, so we
  // can append it to $el.
  $el.append(converter.annotatedText([id, 'content']));
  return $el;
};

module.exports = Todo;
