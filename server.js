var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;
var browserify = require("browserify");
var sass = require('node-sass');

var handleError = function(err, res) {
  console.error(err);
  res.status(400).json(err);
};

// Basic integration example
// --------------------

app.get('/:name/app.js', function (req, res) {
  var demoName = req.params.name;
  browserify({ debug: true, cache: false })
    .add(path.join(__dirname, demoName, 'app.js'))
    .bundle()
    .on('error', function(err){
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

app.listen(port, function() {
  console.log("Lens running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

// Use static server
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'assets', 'font-awesome-4.4.0')));

// Export app for requiring in test files
module.exports = app;