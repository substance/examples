'use strict';

var $ = window.$ = require('jquery');
var Notepad = require('./notepad');
var Component = require('substance/ui/component');
var $$ = Component.$$;

$(function() {
  var htmlContent = $('#editor_container').html();
  $('#editor_container').empty();

  var notepad = $$(Notepad, {
    content: htmlContent
  });

  Component.mount(notepad, $('#editor_container'));
});