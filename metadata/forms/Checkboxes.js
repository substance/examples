'use strict';

var each = require('lodash/each')
var Field = require('./Field');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function Checkboxes() {
  Checkboxes.super.apply(this, arguments);
}

Checkboxes.Prototype = function() {

  this.getFieldValue = function() {
    var config = this.getConfig();
    var options = config.options;
    var result = [];
    var checkboxes = this.refs.checkboxes.getChildren();
    each(checkboxes, function(checkbox, i) {
      var value = checkbox.children[0].$el[0].checked;
      if(value) result.push(options[i]);
    });
    return result;
  };
	
  this.render = function() {
    var self = this;

  	var name = this.getName();
  	var config = this.getConfig();
  	var value = this.getValue();

    var el = $$('div')
      .addClass('sc-field sc-field-checkboxes sc-field-' + name);

    var checkboxes = $$('div').ref('checkboxes');

    each(config.options, function(option) {

      var input = $$('input').attr({type: "checkbox"})
        .on('change', self.commit);

      if(value.indexOf(option) > -1) {
        input.attr({checked: "checked"});
      }

      var label = $$('label')
        .append(input)
        .append(option);

      checkboxes.append(label);

    });
    el.append(checkboxes);    
    return el;
  };
};

Field.extend(Checkboxes);

module.exports = Checkboxes;