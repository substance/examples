'use strict';

var $ = window.$ = require('jquery');
var Editor = require('substance/ui/editor');
var Component = require('substance/ui/component');
var $$ = Component.$$;

$(function() { 
  var htmlContent = $('#editor_container').html();
  $('#editor_container').empty();
  var proseEditor = Component.mount($$(Editor, {
    content: htmlContent
  }), $('#editor_container'));
});
