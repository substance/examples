var b = require('substance-bundler');
var fs = require('fs')
var path = require('path')

var examples = [
  'code-editor',
  'focused',
  'form',
  'hybrid-inline',
  'image',
  'inline-node',
  'input',
  'macros',
  'nested',
  'minimal',
  'table'
]

b.task('clean', function() {
  b.rm('./dist')
})

b.task('substance:css', function() {
  b.make('substance', 'css')
})

b.task('assets', ['substance:css'], function() {
  b.copy('node_modules/font-awesome', './dist/lib/font-awesome')
  b.copy('node_modules/ace-builds/src', './dist/lib/ace')
  b.copy('node_modules/substance/dist', './dist/lib/substance')
  b.copy('./index.html', './dist/')
})

b.task('examples', function() {
  examples.forEach(function(name) {
    _example(name, true)
  })
})

b.task('examples:pure', function() {
  examples.forEach(function(name) {
    _example(name, false)
  })
})

examples.forEach(function(name) {
  b.task('dev:'+name, ['assets'], function() {
    _example(name, false)
  })

  b.task(name, ['assets'], function() {
    _example(name, true)
  })
})

// Used for deployment (transpiled js and css)
b.task('default', ['clean', 'assets', 'examples'])

// Used for development (native js + css)
b.task('dev', ['clean', 'assets', 'examples:pure'])

// starts a server when CLI argument '-s' is set
b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: 'dist'
})

// builds one example
function _example(name, legacy) {
  const src = './'+name+'/'
  const dist = './dist/'+name+'/'
  if (fs.existsSync(src+'assets')) {
    b.copy(src+'assets', dist+'assets')
  }
  b.copy(src+'index.html', dist)
  b.css(src+'app.css', dist+'app.css', { variables: legacy })
  b.js(src+'app.js', {
    target: {
      // useStrict: !legacy,
      dest: dist+'app.js',
      format: 'umd', moduleName: 'example_'+name
    },
    ignore: ['./XNode'],
    alias: {
      'substance': path.join(__dirname, 'node_modules/substance/index.es.js')
    },
  })
}
