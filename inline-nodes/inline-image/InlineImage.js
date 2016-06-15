'use strict';

var InlineNode = require('substance/model/InlineNode');

function InlineImage() {
  InlineImage.super.apply(this, arguments);
}

InlineNode.extend(InlineImage);

InlineImage.static.name = 'inline-image';

InlineImage.static.defineSchema({
  src: { type: 'string', default: './inline-image/smile.png' }
});

module.exports = InlineImage;
