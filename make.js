var b = require('substance-bundler');

b.task('clean', function() {
  b.rm('./dist')
})

// this optional task makes it easier to work on Substance core
b.task('substance', function() {
  b.make('substance', 'clean', 'css', 'browser:umd')
  b.copy('node_modules/substance/dist', './lib/substance')
})

// build all
b.task('default', ['substance'])

// starts a server when CLI argument '-s' is set
b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: '.'
})