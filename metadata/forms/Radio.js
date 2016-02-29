'use strict';

var each = require('lodash/each')
var Field = require('./Field');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function Radio() {
  Radio.super.apply(this, arguments);
}

Radio.Prototype = function() {

  this.getFieldValue = function() {
    var config = this.getConfig();
    var options = config.options;
    var result = "";
    var radios = this.refs.radio.getChildren();
    each(radios, function(radio, i) {
      var value = radio.children[0].$el[0].checked;
      if(value) result = options[i];
    });
    return result;
  };
	
  this.render = function() {
    var self = this;

  	var name = this.getName();
  	var config = this.getConfig();
  	var value = this.getValue();

    var el = $$('div')
      .addClass('sc-field sc-field-radio sc-field-' + name);

    var radios = $$('div').ref('radio');

    each(config.options, function(option) {

      var input = $$('input').attr({type: "radio", name: name})
        .on('change', self.commit);

      if(value.indexOf(option) > -1) {
        input.attr({checked: "checked"});
      }

      var label = $$('label')
        .append(input)
        .append(option);

      radios.append(label);

    });
    el.append(radios);    
    return el;
  };
};

Field.extend(Radio);

module.exports = Radio;