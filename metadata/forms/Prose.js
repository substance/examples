'use strict';

var Field = require('./Field');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function Text() {
  Text.super.apply(this, arguments);
}

Text.Prototype = function() {
	
  this.render = function() {
  	var name = this.getName();
  	var config = this.getConfig();
  	var value = this.getValue();
    
    var el = $$('div')
      .addClass('sc-field sc-field-text sc-field-' + name);
    var input = $$('input').attr({type: config.dataType, placeholder: config.placeholder, value: value})
      .ref('input')
      .on('change', this.commit);
    
    el.append(input);
    
    return el;
  };
};

Field.extend(Text);

module.exports = Text;