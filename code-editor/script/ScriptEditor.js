/* globals ace */
'use strict';

var Component = require('substance/ui/Component');

function ScriptEditor() {
  ScriptEditor.super.apply(this, arguments);

  this.editor = null;
}

ScriptEditor.Prototype = function() {

  // don't rerender because this would destroy ACE
  this.shouldRerender = function() {
    return false;
  };

  this.didMount = function() {
    var node = this.props.node;
    var editor = ace.edit(this.refs.source.getNativeElement());
    // editor.setTheme("ace/theme/monokai");
    editor.setOptions({
      maxLines: Infinity,
    });
    editor.$blockScrolling = Infinity;
    editor.getSession().setMode("ace/mode/" + node.language);
    // TODO: don't we need to dispose the editor?
    // For now we update the model only on blur
    // Option 1: updating on blur
    //   pro: one change for the whole code editing session
    //   con: very implicit, very late, hard to get selection right
    editor.on('blur', this._updateModelOnBlur.bind(this));

    editor.commands.addCommand({
      name: 'escape',
      bindKey: {win: 'Escape', mac: 'Escape'},
      exec: function(editor) {
        this.send('escape');
        editor.blur();
      }.bind(this),
      readOnly: true // false if this command should not apply in readOnly mode
    });

    this.editor = editor;

    this.props.node.on('source:changed', this._onModelChange, this);
  };

  this.dispose = function() {
    this.props.node.off(this);
    this.editor.destroy();
  };

  this.render = function($$) {
    var node = this.props.node;
    var el = $$('div').addClass('sc-script-editor');
    el.append(
      $$('div').append(node.source).ref('source')
    );
    return el;
  };

  this._updateModelOnBlur = function() {
    var editor = this.editor;
    var nodeId = this.props.node.id;
    var source = editor.getValue();
    if (source !== this.props.node.source) {
      this.context.surface.transaction(function(tx) {
        tx.set([nodeId, 'source'], editor.getValue());
      }, { source: this, skipSelection: true });
    }
  };

  this._onModelChange = function(change, info) {
    if (info.source !== this) {
      this.editor.setValue(this.props.node.source, -1);
    }
  };
};

Component.extend(ScriptEditor);

ScriptEditor.static.fullWidth = true;

module.exports = ScriptEditor;
