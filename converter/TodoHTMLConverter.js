'use strict';

/*
  HTML converter for Todo Entries
*/
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
