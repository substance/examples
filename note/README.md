# Note

This example implements a custom Note article type.

- [noteSchema.js](noteSchema.js) - schema definition to model notes
- [Note.js](Note.js) - Article class implementation
- [testNote.js](testNote.js) - Construction of a note and data manipulation

Run and play with the test script:

```
node testNote.js
```

*The Note article type is used in the [Notepad](../notepad) example.*

### Define Note class

In this example we define a `Note` article class, that consists of paragraphs and todo items. Text can be linked, emphasized (`emphasis`, `strong`) and highlighted (`mark`).

We are utilizing a number of predefined node types in our schema  (
[Paragraph](https://github.com/substance/substance/blob/master/packages/paragraph),
[Emphasis](https://github.com/substance/substance/blob/master/packages/emphasis),
[Strong](https://github.com/substance/substance/blob/master/packages/strong),
[Link](https://github.com/substance/substance/blob/master/packages/link))
but also include custom ones ([Todo](noteSchema.js),
[Mark](noteSchema.js)).

```js
// From noteSchema.js

var schema = new DocumentSchema('substance-note', '1.0.0');
schema.getDefaultTextType = function() {
  return 'paragraph';
};

schema.addNodes([
  require('substance/packages/paragraph/Paragraph'),
  require('substance/packages/heading/Heading'),
  require('substance/packages/codeblock/Codeblock'),
  require('substance/packages/blockquote/Blockquote'),
  require('substance/packages/image/Image'),
  require('substance/packages/emphasis/Emphasis'),
  require('substance/packages/strong/Strong'),
  require('substance/packages/link/Link'),
  Todo,
  Mark
]);
```

Let's have a look at the `Mark` implementation, that defines a custom annotation for highlighting text in a note.

```js
// From noteSchema.js
function Mark() {
  Mark.super.apply(this, arguments);
}
PropertyAnnotation.extend(Mark);
Mark.static.name = 'mark';
```


We also define a `Todo` class that inherits from the Substance `TextNode`. A todo is represented with annotated text (`content`) and boolean flag (`done`).

```js
// From noteSchema.js
function Todo() {
  Todo.super.apply(this, arguments);
}

TextBlock.extend(Todo);
Todo.static.name = 'todo';

Todo.static.defineSchema({
  content: 'text',
  done: { type: 'bool', default: false }
});
```
