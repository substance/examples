'use strict';

var map = require('lodash/map')
var range = require('lodash/range')
var Field = require('./Field');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function Date() {
  Date.super.apply(this, arguments);
}

Date.Prototype = function() {

  this.getMonthName = function(month) {
    return this.constructor.static.monthNames[month];
  };

  this.getValue = function() {
    var value = this.props.value;
    var date = new window.Date(value);
    var result = {};
    result.days = date.getDate();
    result.months = date.getMonth();
    result.years = date.getFullYear();
    return result;
  };

  this.getFieldValue = function() {
    var days = this.refs.days.val();
    var months = this.refs.months.val() - 1;
    var years = this.refs.years.val();
    var date = new window.Date(years, months, days);
    return date.toISOString();
  };
	
  this.render = function() {
    var self = this;

  	var name = this.getName();
  	var config = this.getConfig();
  	var value = this.getValue();

    var today = new window.Date();
    var startYear = config.startYear || today.getFullYear() - 100;
    var endYear = config.endYear || today.getFullYear();

    var days = $$('select').ref('days').on('change', this.commit);
    map(range(1, 32), function(day) {
      var option = $$('option').attr({value: day}).append(day.toString());
      if(day === value.days) option.attr({selected: "selected"});
      days.append(option);
    });

    var months = $$('select').ref('months').on('change', this.commit);
    map(range(1, 13), function(month) {
      var monthName = self.getMonthName(month - 1);
      var option = $$('option').attr({value: month}).append(monthName);
      if(value.months === month - 1) option.attr({selected: "selected"});
      months.append(option);
    }, this);

    var years = $$('select').ref('years').on('change', this.commit);
    map(range(startYear, endYear + 1), function(year) {
      var option = $$('option').attr({value: year}).append(year.toString());
      if(year === value.years) option.attr({selected: "selected"});
      years.append(option);
    }, this);

    var el = $$('div')
      .addClass('sc-field sc-field-date sc-field-' + name);

    el.append([days, months, years]);
    
    return el;
  };
};

Field.extend(Date);

Date.static.monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

module.exports = Date;