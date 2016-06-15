'use strict';
/* eslint-disable no-console */

var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;
var server = require('substance/util/server');

['code-editor', 'collabwriter', 'form', 'focused', 'images', 'inception', 'input', 'macros', 'nested', 'tables'].forEach(function(folder) {
  server.serveStyles(app, '/'+folder+'/app.css', path.join(__dirname, folder, 'app.scss'));
  server.serveJS(app, '/'+folder+'/app.js', path.join(__dirname, folder, 'app.js'));
});

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

// for the code-editor example
app.use('/ace', express.static(path.join(__dirname, 'node_modules/ace-builds/src')));

app.listen(port, function() {
  console.log("Substance Examples running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

module.exports = app;
