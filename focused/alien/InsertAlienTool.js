'use strict';

var Tool = require('substance/ui/Tool');

function InsertAlienTool() {
  InsertAlienTool.super.apply(this, arguments);
}

InsertAlienTool.Prototype = function() {

  this.renderIcon = function($$) {
    return $$('img').attr({
      src: 'alien/alien.svg',
      height: 12
    });
  };

};

Tool.extend(InsertAlienTool);

InsertAlienTool.static.name = 'insert-alien';

module.exports = InsertAlienTool;
