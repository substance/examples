'use strict';

var isString = require('lodash/lang/isString');
var each = require('lodash/collection/each');
var Component = require('substance/ui/Component');
var Controller = require('substance/ui/Controller');
var Surface = require('substance/ui/Surface');
var ContainerEditor = require('substance/ui/ContainerEditor');
var EditingBehavior = require('substance/model/EditingBehavior');
var TextPropertyManager = require('substance/model/TextPropertyManager');
var UnsupportedNode = require('substance/ui/UnsupportedNode');
var Editor = require('../simple/Editor');
var $$ = Component.$$;

function GhostEditor() {
  GhostEditor.super.apply(this, arguments);

  if (!isString(this.props.containerId)) throw new Error("Illegal argument: Expecting containerId.");

  var doc = this.getDocument();
  this.name = this.props.name;

  this.textTypes = this.props.textTypes;
  this._initializeCommandRegistry(this.props.commands);

  this.editingBehavior = new EditingBehavior();
  this.textPropertyManager = new TextPropertyManager(doc, this.props.containerId);

  doc.connect(this, {
    'document:changed': this.onDocumentChange
  });
}

GhostEditor.Prototype = function() {

  this.render = function() {
    var el = $$("div")
      .addClass('surface')
      .attr('spellCheck', false);

    var doc = this.getDocument();
    var containerId = this.props.containerId;
    var containerNode = doc.get(this.props.containerId);
    if (!containerNode) {
      console.warn('No container node found for ', this.props.containerId);
    }
    el.addClass('sc-container-editor container-node ' + containerId)
      .attr({
        spellCheck: false,
        "data-id": containerId
      });
    // node components
    each(containerNode.nodes, function(nodeId) {
      el.append(this._renderNode(nodeId));
    }, this);

    return el;
  };


  this.dispose = function() {
    var doc = this.getDocument();
    this.setSelection(null);
    this.textPropertyManager.dispose();
    // Document Change Events
    doc.disconnect(this);
  };

  this.getChildContext = function() {
    return {
      surface: this,
      doc: this.getDocument()
    };
  };

  this.getCommand = function(commandName) {
    return this.commandRegistry.get(commandName);
  };

  this.getTextTypes = function() {
    return this.textTypes || [];
  };

  this.getController = function() {
    return this;
  };

  this.getDocument = function() {
    return this.documentSession.getDocument();
  };

  this.getDocumentSession = function() {
    return this.documentSession;
  };

  this.getName = Surface.prototype.getName;

  this.transaction = Surface.prototype.transaction;

  this.getSelection = function() {
    return this.documentSession.getSelection();
  };

  this.setSelection = function(sel) {
    this.documentSession.setSelection(sel);
    this.textPropertyManager.renderSelection(this.getSelection());
  };

  this.rerenderDomSelection = function() {
    this.textPropertyManager.renderSelection(this.getSelection());
  };

  this.getTextPropertyManager = function() {
    return this.textPropertyManager;
  };

  this.onDocumentChange = ContainerEditor.prototype.onDocumentChange;

  this.isContainerEditor = ContainerEditor.prototype.isContainerEditor;

  this.getContainerId = ContainerEditor.prototype.getContainerId;

  this.getContainer = ContainerEditor.prototype.getContainer;

  this._prepareArgs = function(args) {
    args.containerId = this.getContainerId();
    args.editingBehavior = this.editingBehavior;
  };

  this._insertNodeAt = function(pos, nodeId) {
    var comp = this._renderNode(nodeId);
    this.insertAt(pos, comp);
  };

  this._removeNodeAt = function(pos) {
    this.removeAt(pos);
  };

  this._renderNode = function(nodeId) {
    var doc = this.getDocument();
    var node = doc.get(nodeId);
    var componentRegistry = this.componentRegistry;
    var ComponentClass = componentRegistry.get(node.type);
    if (!ComponentClass) {
      console.error('Could not resolve a component for type: ' + node.type);
      ComponentClass = UnsupportedNode;
    }
    return $$(ComponentClass, {
      doc: doc,
      node: node
    });
  };

  this._getFragments = Surface.prototype._getFragments;

  this._registerTextProperty = function() {};

  this._recordChanges = Surface.prototype._recordChanges;

};

Controller.extend(GhostEditor);

GhostEditor.static.config = Editor.static.config;

module.exports = GhostEditor;
