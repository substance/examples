'use strict';

var PropertyAnnotation = require('substance/model/PropertyAnnotation');
var Fragmenter = require('substance/model/Fragmenter');

function Tags() {
  Tags.super.apply(this, arguments);
}

PropertyAnnotation.extend(Tags);

Tags.static.name = "tags";

Tags.static.defineSchema({
  tags: { type: ["id"], default: [] }
});

module.exports = Tags;
