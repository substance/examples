'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;

function Field() {
  Field.super.apply(this, arguments);
}

Field.Prototype = function() {

	this.getName = function() {
		return this.props.id;
	};

	this.getConfig = function() {
		return this.props.config;
	};

	this.getValue = function() {
		return this.props.value;
	};

	this.getFieldValue = function() {
		return this.refs.input.val();
	};

	this.getDocumentSession = function() {
		var form = this.props.form;
		return form.props.tool.getDocumentSession();
	};

	this.getNodeId = function() {
		return this.props.form.node.id;
	};

	this.commit = function() {
		var documentSession = this.getDocumentSession();
		var nodeId = this.getNodeId();
		var propId = this.props.id;
		var value = this.getFieldValue();

		documentSession.transaction(function(tx) {
		  tx.set([nodeId, propId], value);
		});
	};
	
  this.render = function() {
    return $$('div')
      .addClass('sc-field');
  };
};

Component.extend(Field);

module.exports = Field;