var fs = require('fs');
var NoteExporter = require('./NoteExporter');
var exporter = new NoteExporter();
var doc = require('../note/exampleNote');
var html = exporter.exportDocument(doc);

console.log('exported document: ', html);