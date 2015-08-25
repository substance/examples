var http = require('http');
var express = require('express');
var path = require('path');
var Substance = require("substance");
var fs = require('fs');
var app = express();
var port = process.env.PORT || 5000;
var browserify = require("browserify");
var sass = require('node-sass');

// Basic integration example
// --------------------

app.get('/:name/app.js', function (req, res, next) {
  var demoName = req.params.name;
  browserify({ debug: true, cache: false })
    .add(path.join(__dirname, demoName, 'app.js'))
    .bundle()
    .on('error', function(err, data){
      console.error(err.message);
      res.send('console.log("'+err.message+'");');
    })
    .pipe(res);
});

app.get('/:name/app.css', function(req, res) {
  var demoName = req.params.name;
  sass.render({
    file: path.join(__dirname, demoName, 'app.scss'),
    sourceMap: true,
    sourceMapEmbed: true,
    outFile: 'app.css',
  }, function(err, result) {
    if (err) return handleError(err, res);
    res.set('Content-Type', 'text/css');
    res.send(result.css);
  });
});


var handleError = function(err, res) {
  console.error(err);
  res.status(400).json(err);
};

app.listen(port, function() {
  console.log("Lens running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

// Use static server
app.use(express.static(path.join(__dirname)));

// Export app for requiring in test files
module.exports = app;