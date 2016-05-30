/* globals ace */
'use strict';

var Component = require('substance/ui/Component');

function ScriptEditor() {
  ScriptEditor.super.apply(this, arguments);
}

ScriptEditor.Prototype = function() {

  // don't rerender because this would destroy ACE
  this.shouldRerender = function() {
    return false;
  };

  this.didMount = function() {
    var editor = ace.edit(this.refs.source.getNativeElement());
    // editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        maxLines: Infinity
    });
    editor.getSession().setMode("ace/mode/javascript");
    this.aceEditor = editor;
  };

  this.render = function($$) {
    var node = this.props.node;

    var el = $$('div').addClass('sc-script-editor');
    el.append(
      $$('div').append(node.source).ref('source')
    );

    return el;
  };

};

Component.extend(ScriptEditor);

ScriptEditor.static.fullWidth = true;

module.exports = ScriptEditor;