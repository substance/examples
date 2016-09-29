var b = require('substance-bundler');

b.task('clean', function() {
  b.rm('./lib')
})

// copy assets
b.task('assets', function() {
  b.copy('node_modules/font-awesome', './lib/font-awesome')
  b.copy('node_modules/ace-builds/src', './lib/ace')
})

// this optional task makes it easier to work on Substance core
b.task('substance', function() {
  // i need to build substance manually for now
  b.make('substance', 'clean', 'css', 'browser')
  b.copy('node_modules/substance/dist', './lib/substance')
})

// build all
b.task('default', ['substance', 'assets'])

// starts a server when CLI argument '-s' is set
b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: '.'
})