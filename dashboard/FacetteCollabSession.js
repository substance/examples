'use strict';

var CollabSession = require('substance/test/collab/TestCollabSession');
var DocumentChange = require('substance/model/DocumentChange');
var Facette = require('./Facette');

function FacetteCollabSession() {
  FacetteCollabSession.super.apply(this, arguments);
}

FacetteCollabSession.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this._applyRemoteChange = function(change, collaboratorId) {
    var json = change.toJSON();
    json.ops = json.ops.filter(Facette._filterOp);
    var filteredChange = DocumentChange.fromJSON(json);
    return _super._applyRemoteChange.call(this, filteredChange, collaboratorId);
  };

};

CollabSession.extend(FacetteCollabSession);

module.exports = FacetteCollabSession;
