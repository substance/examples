# Converter

Substance allows you to build custom converters for your model. This example implements a [Note](../note) importer.

- [NoteImporter.js](NoteImporter.js) - Importer entry point
- [TodoHtmlConverter.js](TodoHtmlConverter.js) - DOM conversion for Todo nodes
- [MarkHtmlConverter.js](MarkHtmlConverter.js) - DOM conversion for Mark nodes
- [testNoteImporter.js](testNoteImporter.js) - Usage of the importer

Run and play with the importer test script:

```
node testNodeImporter.js
```

There's another script for demoing the exporter usage:

```
node testNodeExporter.js
```

*The NoteImporter and NoteExporter classes are used in the [Notepad](../notepad) example.*
