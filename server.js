'use strict';
/* eslint-disable no-console */

var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;
var server = require('substance/util/server');

// For each example we need those two lines
server.serveStyles(app, '/collabwriter/app.css', path.join(__dirname, 'collabwriter', 'app.scss'));
server.serveJS(app, '/collabwriter/app.js', path.join(__dirname, 'collabwriter', 'app.js'));
server.serveJS(app, '/collabwriter/hub.js', path.join(__dirname, 'collabwriter', 'hub.js'));
server.serveJS(app, '/collabwriter/client.js', path.join(__dirname, 'collabwriter', 'client.js'));

['prose', 'input', 'form', 'tables'].forEach(function(folder) {
  server.serveStyles(app, '/'+folder+'/app.css', path.join(__dirname, folder, 'app.scss'));
  server.serveJS(app, '/'+folder+'/app.js', path.join(__dirname, folder, 'app.js'));
});

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

app.listen(port, function() {
  console.log("Substance Examples running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

module.exports = app;
