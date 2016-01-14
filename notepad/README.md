# Notepad

This example implements a custom Notepad. Here's a list of all components (=files) involved:

- [app.js](app.js) - entry point where the Notepad created and mounted to the DOM
- [Notepad.js](Notepad.js) - Notepad component
- [TodoComponent.js](TodoComponent.js) - Implementation of the Todo component, including toggle interaction
- [TodoCommand.js](TodoCommand.js) - Surface command for toggling todos
- [TodoTool.js](TodoTool.js) - Tool definition for todo toggle.
- [MarkCommand.js](MarkCommand.js) - Surface command for toggling marks
- [MarkTool.js](MarkTool.js) - Tool definition for mark toggle.

*This examples uses the [Note](../note) and [Converter](../converter) examples.*

## Building a Notepad with Substance

Substance lets you build your very own text editor. Let's walk through the creation of a simple [Notepad](http://substance.io/demos/notepad) app. It can be used like this when ready.

```js
var doc = noteImporter.importDocument(NOTE_HTML);
Component.mount(Notepad, {
  doc: doc
}, $('#editor_container'));
```

### Notepad

Let's look at the top level UI component first. We call the class `Notepad` and we implement a render method that renders our editor.

```js
// From Notepad.js
function Notepad() {
  Controller.apply(this, arguments);
}

Notepad.Prototype = function() {
  this.render = function() {
    var config = this.getConfig();
    return $$('div').addClass('sc-notepad').append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        $$(Toolbar).append(
          $$(Toolbar.Group).append(
            $$(SwitchTextTypeTool, {'title': this.i18n.t('switch_text')}),
            $$(UndoTool).append($$(Icon, {icon: 'fa-undo'})),
            $$(RedoTool).append($$(Icon, {icon: 'fa-repeat'})),
            $$(StrongTool).append($$(Icon, {icon: 'fa-bold'})),
            $$(EmphasisTool).append($$(Icon, {icon: 'fa-italic'})),
            $$(MarkTool).append($$(Icon, {icon: 'fa-pencil'})),
            $$(LinkTool).append($$(Icon, {icon: 'fa-link'})),
            $$(TodoTool).append($$(Icon, {icon: 'fa-check-square-o'}))
          )
        ),
        $$(ContainerEditor, {
          doc: this.props.doc,
          containerId: 'body',
          name: 'bodyEditor',
          commands: config.bodyEditor.commands,
          textTypes: config.bodyEditor.textTypes
        }).ref('bodyEditor')
      )
    );
  };
};

Controller.extend(Notepad);
```

The [full implementation](Notepad.js) also includes an extensive configuration object. For all custom node types we also need to provide UI components.

### Todo Component

```js
// From todo_component.js
function TodoComponent() {
  Component.apply(this, arguments);
}

TodoComponent.Prototype = function() {
  ...
  this.render = function() {
    // Checkbox defining wheter a todo is done or not. We don't want the cursor
    // to move inside this area,so we set contenteditable to false
    var checkbox = $$('span').addClass('se-done').attr({contenteditable: false}).append(
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
        $$(TextProperty, {
          doc: this.props.doc,
          path: [ this.props.node.id, "content"]          
        })
      ]);

    if (this.props.node.done) {
      el.addClass('sm-done');
    }
    return el;
  };
  ...

};

Component.extend(TodoComponent);
```

#### Define commands

Tools encapsulate document manipulation code according to specific user tasks. The [MarkCommand](MarkCommand.js) is a just a simple AnnotationCommand much like strong and emphasis. The [TodoCommand](TodoCommand) implements toggling between todo and paragraph elements and needs some custom logic.

```js
var TodoCommand = function(surface) {
  SurfaceCommand.call(this, surface);
};

TodoCommand.Prototype = function() {
  ...
  this.getCommandState = function() {
    var surface = this.getSurface();
    var sel = this.getSelection();
    var disabled = !surface.isEnabled() || sel.isNull() || !sel.isPropertySelection();
    var targetType = this.getTargetType();

    return {
      targetType: targetType,
      active: targetType !== 'todo',
      disabled: disabled
    };
  };

  this.execute = function() {
    var sel = this.getSelection();
    if (!sel.isPropertySelection()) return;
    var surface = this.getSurface();
    var targetType = this.getTargetType();

    if (targetType) {
      // A Surface transaction performs a sequence of document operations
      // and also considers the active selection.    
      surface.transaction(function(tx, args) {
        args.data = {
          type: targetType
        };
        return surface.switchType(tx, args);
      });
      return {status: 'ok'};
    }
  };
};
SurfaceCommand.extend(TodoCommand);
TodoCommand.static.name = 'todo';
```

Commands need to implement `getCommandState` which can be used by tools to render according to the command state. E.g. when active is true, the tool button is highlighted.

#### Define Tools

Tools are bound to commands and are their visual counterpart. Their implementation is usually simple, unless they involve UI logic.

```js
// From TodoTool.js
var SurfaceTool = require('substance/ui/SurfaceTool');
function TodoTool() {
  TodoTool.super.apply(this, arguments);
}
SurfaceTool.extend(TodoTool);
TodoTool.static.name = 'todo';
TodoTool.static.command = 'todo';
```

That's it. Feel free to play with the code. A nice way to learn Substance is to define a custom node type (model + converter + UI components) and add it to the notepad implementation. See the [Substance API docs](http://substance.io/docs) to learn about individual interfaces.
