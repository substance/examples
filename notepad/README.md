**The README reflects the old API, please look at the code files directly**. We will update this README in the next days.

## Building a Notepad with Substance

Substance lets you configure your very own text editor. Let's walk together through the creation of a simple [Notepad](http://substance.io/demos/notepad) app. It can be used like this when ready.

```js
var notepad = $$(Notepad, {
  content: htmlContent
});
Component.mount(notepad, $('#editor_container'));
```

### Define article class

We will define a `Note` article class, that consists of paragraphs and todo items. Text can be linked, emphasized (`emphasis`, `strong`) and highlighted (`mark`).

The following files define our article class

- [note.js](note.js) - Note article class
- [mark.js](mark.js) - Mark annotation
- [todo.js](todo.js) - Todo node


We are utilising a number of predefined node types ([Paragraph](https://github.com/substance/substance/blob/master/document/nodes/paragraph.js), [Emphasis](https://github.com/substance/substance/blob/master/document/nodes/emphasis.js), [Strong](https://github.com/substance/substance/blob/master/document/nodes/paragraph.js), [Link](https://github.com/substance/substance/blob/master/document/nodes/link.js)) but also include custom ones ([Todo](todo.js), [Mark](mark.js)).

```js
// From note.js
var Document = require('substance/document');
var SubstanceArticle = require('substance/article');

// Custom node implementations
var Todo = require('./todo');
var Mark = require('./mark');

var schema = new Document.Schema("substance-note", "1.0.0");
schema.getDefaultTextType = function() {
  return "paragraph";
};

schema.addNodes([
  Document.Paragraph,
  Document.Emphasis,
  Document.Strong,
  Document.Link,
  Todo,
  Mark
]);
```

Let's have a look at the `Mark` implementation, that defines a custom annotation for highlighting text in a note.

```js
// From mark.js
var Annotation = require('substance/document/annotation');

var Mark = Annotation.extend({
  name: "mark",
  splitContainerSelections: true
});

// HTML tag used to represent a mark annotation
Mark.static.tagName = "mark";

// Called during import from HTML. If matched `fromHtml` is called. 
// We don't need to implement it, since it's defined on the Annotation class.
Mark.static.matchElement = function($el) {
  return $el.is("mark");
};
```

In the HTML exchange format mark annotations will look like this.

```html
<p>Some <mark>marked</mark> text</p>
```

We also define a `Todo` class that inherits from the Substance `TextNode`.

```js
// From todo.js
var TextNode = require('substance/document/text_node');
var Todo = TextNode.extend({
  name: "todo",
  properties: {
    done: "bool",
    content: "string"
  }
});
```

We will encode our Todo items in HTML for exchange.

```html
<div class="todo" data-done="1">Fix bug</div>
```

In order to make this work we need to define mappings between HTML and the in-memory representation. This is pretty straight forward. We use jQuery for interacting with the DOM, this allows us to execute the same code on the server using [cheerio](https://github.com/cheeriojs/cheerio). Here's the `fromHtml` code that maps a DOM element to a Todo object.

```js
// From todo.js
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
```

### Define UI components

The following custom UI components are needed for our Notepad editor.

- [notepad.js](notepad.js) - `Editor` implementation 
- [toolbar.js](todo_tool.js) - Toolbar `Component`
- [todo_component.js](todo_component.js) - Todo `Component` displayed in the editor flow

Let's look at the top level component. We call it `Notepad` and inherit from `Editor`.

```js
// From notepad.js
var Notepad = Editor.extend({
  config: {
    article: Note,
    toolbar: Toolbar,
    tools: tools,
    components: {
      "paragraph": require('substance/ui/nodes/paragraph_component'),
      "link": require('substance/ui/nodes/link_component'),
      "todo": require('./todo_component')
    }
  }
});
```

In the configuration object we pass the `Note` article class that we just defined. We will also define a custom `TodoComponent` that is rendered in within the editing surface.

```js
// From todo_component.js
...
TodoComponent.Prototype = function() {
  ...
  this.render = function() {
    // Checkbox defining wheter a todo is done or not. We don't want the cursor
    // to move inside this area,so we set contenteditable to false
    var checkbox = $$('span').addClass('done').attr({contenteditable: false}).append(
      $$(Icon, {icon: this.props.node.done ? "fa-check-square-o" : "fa-square-o"})
    );
    checkbox.on('mousedown', this.toggleDone);

    var el = $$('div')
      .addClass(this.getClassNames())
      .attr("data-id", this.props.node.id)
      .append([
        checkbox,
        // TextProperty is used to render annotated content.
        // It takes a doc and a path to a text property as an input.
        $$(TextProperty).addProps({
          doc: this.props.doc,
          path: [ this.props.node.id, "content"]
        })
      ]);

    if (this.props.node.done) {
      el.addClass('done');
    }
    return el;
  };
};
```

Finally we design our custom toolbar, where we pick only the tools we need. We have complete freedom on how we organise them. We could wrap them in a container for instance to create groups of tools. Attached is a very simple implementation.

```js
// From toolbar.js
...
var Toolbar = Component.extend({
  render: function() {
    return $$('div').addClass('toolbar').append([
      $$(ToolComponent, {tool: 'undo', 'title': 'Undo'}).append($$(Icon, {icon: 'fa-undo'})),
      $$(ToolComponent, {tool: 'redo', 'title': 'Redo'}).append($$(Icon, {icon: 'fa-repeat'})),
      $$(ToolComponent, {tool: 'emphasis', 'title': 'Emphasis'}).append($$(Icon, {icon: 'fa-italic'})),
      $$(ToolComponent, {tool: 'strong', title: 'Strong'}).append($$(Icon, {icon: 'fa-bold'})),
      $$(ToolComponent, {tool: 'mark', 'title': 'Mark'}).append($$(Icon, {icon: "fa-pencil"})),
      $$(LinkToolComponent, {
        tool: 'link',
        'title': 'Link',
        children: [$$(Icon).addProps({icon: "fa-link"})]
      }).addClass('tool'),
      $$(ToolComponent, {tool: 'todo', 'title': 'Create Todo'}).append($$(Icon, {icon: "fa-check-square-o"}))
    ]);
  }
});
```

#### Define Tools

Tools encapulate document manipulation code according to specific user tasks. They function as a data model for Tool Components. For instance the TodoTool implements toggling between todo and paragraph elements.

Our Nodepad editor implements the following custom tools:

- [mark_tool.js](mark_tool.js) - Toggle mark annotations
- [todo_tool.js](todo_tool.js) - Toggle todos


```js
// From todo_tool.js
var TodoTool = Tool.extend({
  name: "todo",
  
  // Update toolstate according to current selection
  update: function(surface, sel) {
    ...
    if (nodeType === 'paragraph') {
      targetType = 'todo';
    } else {
      targetType = 'paragraph';
      active = true;
    }
    this.setToolState({
      surface: surface,
      sel: sel,
      targetType,
      active: active,
      disabled: false
    });
  },
  
  performAction: function() {
    ...
    // A Surface transaction performs a sequence of document operations
    // and also considers the active selection.    
    surface.transaction(function(tx, args) {
      args.data = {
        type: state.targetType
      };
      // switch text type 
      return editor.switchType(tx, args);
    });
  }
```

The Mark tool is just an annotation tool like strong and emphasis, so we can inherit the whole functionality.

```js
// From mark_tool.js
var AnnotationTool = require('substance/surface/annotation_tool');
var MarkTool = AnnotationTool.extend({
  name: "mark"
});
```
That's it. Now it's on you to dig deeper, ideally by starting your own editor project. Give yourself some time to get familiar with the API's. Building a web-editor is not a trivial task, as there are many things that can go wrong. However, with Substance most of the complexities (such as undo/redo, keyboard and clipboard handling etc.) are taken care of, so you can focus on building user interfaces.
