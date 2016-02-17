'use strict';
/* eslint-disable no-console */

var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;
var server = require('substance/util/server');
var config = require('./config');

config.examples.forEach(function(folder) {
  server.serveStyles(app, '/'+folder+'/app.css', {
    rootDir: __dirname,
    configuratorPath: require.resolve('./lib/ExampleConfigurator'),
    configPath: require.resolve('./'+folder+'/config')
  });
  server.serveJS(app, '/'+folder+'/app.js', path.join(__dirname, folder, 'app.js'));
});

server.serveStyles(app, '/tags/app.css', path.join(__dirname, 'tags', 'app.scss'));
server.serveJS(app, '/tags/app.js', path.join(__dirname, 'tags', 'app.js'));

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
