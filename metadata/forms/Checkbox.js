'use strict';

var Field = require('./Field');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function Checkbox() {
  Checkbox.super.apply(this, arguments);
}

Checkbox.Prototype = function() {

  this.getFieldValue = function() {
    var value = this.refs.input.$el[0].checked;
    return value;
  };
	
  this.render = function() {
  	var name = this.getName();
  	var config = this.getConfig();
  	var value = this.getValue();
    
    var el = $$('div')
      .addClass('sc-field sc-field-checkbox sc-field-' + name);

    var input = $$('input').attr({type: "checkbox"})
      .ref('input')
      .on('change', this.commit);

    if(value) {
      input.attr({checked: "checked"});
    }

    var label = $$('label')
      .append(input)
      .append(config.placeholder);

    el.append(label);
    
    return el;
  };
};

Field.extend(Checkbox);

module.exports = Checkbox;