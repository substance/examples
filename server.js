var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;
var server = require('substance/util/server');

// For each example we need those two lines
server.serveStyles(app, '/notepad/app.css', path.join(__dirname, 'notepad', 'app.scss'));
server.serveJS(app, '/notepad/app.js', path.join(__dirname, 'notepad', 'app.js'));

server.serveStyles(app, '/ghostwriter/app.css', path.join(__dirname, 'ghostwriter', 'app.scss'));
server.serveJS(app, '/ghostwriter/app.js', path.join(__dirname, 'ghostwriter', 'app.js'));

server.serveStyles(app, '/collabwriter/app.css', path.join(__dirname, 'collabwriter', 'app.scss'));
server.serveJS(app, '/collabwriter/app.js', path.join(__dirname, 'collabwriter', 'app.js'));
server.serveJS(app, '/collabwriter/hub.js', path.join(__dirname, 'collabwriter', 'hub.js'));
server.serveJS(app, '/collabwriter/client.js', path.join(__dirname, 'collabwriter', 'client.js'));

server.serveStyles(app, '/prose/app.css', path.join(__dirname, 'prose', 'app.scss'));
server.serveJS(app, '/prose/app.js', path.join(__dirname, 'prose', 'app.js'));

server.serveStyles(app, '/isolated-nodes/app.css', path.join(__dirname, 'isolated-nodes', 'app.scss'));
server.serveJS(app, '/isolated-nodes/app.js', path.join(__dirname, 'isolated-nodes', 'app.js'));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

app.listen(port, function() {
  console.log("Substance Examples running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

// Export app for requiring in test files
module.exports = app;