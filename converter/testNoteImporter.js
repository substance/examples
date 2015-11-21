var fs = require('fs');
var NoteImporter = require('./NoteImporter');
var importer = new NoteImporter();
var html = fs.readFileSync(__dirname+'/note.html', 'utf8');

var doc = importer.importDocument(html);
console.log('doc', doc.toJSON());