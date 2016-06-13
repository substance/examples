'use strict';

var ContainerAnnotation = require('substance/model/ContainerAnnotation');
// var Fragmenter = require('../../model/Fragmenter');

function Highlight() {
  Highlight.super.apply(this, arguments);
}

ContainerAnnotation.extend(Highlight);

Highlight.static.name = 'highlight';

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
// Strong.static.fragmentation = Fragmenter.ANY;

module.exports = Highlight;