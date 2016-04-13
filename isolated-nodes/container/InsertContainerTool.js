'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var $$ = Component.$$;

function InsertContainerTool() {
  InsertContainerTool.super.apply(this, arguments);
}

InsertContainerTool.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this.renderButton = function() {
    var button = _super.renderButton.call(this);
    button.append($$(Icon, {icon: 'fa-file-text-o'} ));
    return button;
  };

};

SurfaceTool.extend(InsertContainerTool);

InsertContainerTool.static.name = 'insert-container';

module.exports = InsertContainerTool;
