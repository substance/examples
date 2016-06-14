'use strict';

var ContainerAnnotation = require('substance/model/ContainerAnnotation');
var Fragmenter = require('substance/model/Fragmenter');

function Highlight() {
  Highlight.super.apply(this, arguments);
}

ContainerAnnotation.extend(Highlight);

Highlight.static.name = 'highlight';

Highlight.static.fragmentation = Fragmenter.SHOULD_NOT_SPLIT;

module.exports = Highlight;