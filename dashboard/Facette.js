'use strict';

var each = require('lodash/each');
var Document = require('substance/model/Document');
var Article = require('./Article');

function Facette(seed) {
  Facette.super.call(this);

  var meta = seed.meta;
  if (meta) {
    each(meta, function(val, key) {
      this.set(['meta', key], val);
    }.bind(this))
  }
}

function _filterByPath(path) {
  if (path[0] === 'meta') {
    switch(path[1]) {
      case 'title':
      case 'abstract':
        return true;
    }
  }
  return false;
}

function _filterOp(op) {
  return _filterByPath(op.path);
}

Facette.Prototype = function() {


  this._apply = function(change) {
    change.ops.filter(_filterOp).forEach(function(op) {
      console.log('Applying op to', op.path.join('.'));
      this.data.apply(op);
    }.bind(this));
    change._extractInformation(this);
  };

  // this._create = function(nodeData) {
  //   return null;
  // };

  // this._delete = function(nodeId) {
  //   return null;
  // };

  this._update = function(path, diff) {
    if (_filterByPath(path)) {
      var op = this.data.update(path, diff);
      return op;
    }
  };

  this._set = function(path, value) {
    if (_filterByPath(path)) {
      var op = this.data.set(path, value);
      return op;
    }
  };
};

Article.extend(Facette);

Facette._filterOp = _filterOp;

module.exports = Facette;
