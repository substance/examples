'use strict';

var Controller = require('substance/ui/Controller');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');
var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontawesomeIcon');
var $$ = Component.$$;

function EditableDashboardEntry() {
  EditableDashboardEntry.super.apply(this, arguments);
}

EditableDashboardEntry.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this.getChildContext = function() {
    return {
      documentSession: this.props.documentSession,
      doc: this.props.documentSession.getDocument(),
      controller: this,
    };
  };

  this.render = function() {
    var el = _super.render.call(this);

    el.addClass('se-entry');
    var table = $$('table');
    table.append(
      $$('colgroup').append(
        $$('col').addClass('se-title-col'),
        $$('col').addClass('se-tools-col')
      )
    );
    var row = $$('tr');
    var titleEl = $$('td').addClass('se-title');
    titleEl.append(
      $$('div').addClass('se-label').append('Title'),
      $$('div').addClass('se-value').append(
        $$(TextPropertyEditor,{
          name: 'meta.title',
          path: ['meta', 'title']
        })
      )
    );
    row.append(titleEl);
    var entryTools = $$('div').addClass('se-tools');
    entryTools.append(
      $$('button').append(
        $$(Icon, { icon: 'fa-edit' })
      ).on('click', this.onClickEditDocument)
    );
    row.append(entryTools);
    table.append(row);
    el.append(table);
    return el;
  };

  this.onClickEditDocument = function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.send('openEditor', this.props.documentId);
  };

};

Controller.extend(EditableDashboardEntry);

module.exports = EditableDashboardEntry;
