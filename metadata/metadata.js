'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function Metadata() {
  Metadata.super.apply(this, arguments);
}

DocumentNode.extend(Metadata);

Metadata.static.name = "metadata";

Metadata.static.defineSchema({
  author: { type: "string", default: "" },
  published: { type: "boolean", default: false },
  source: { type: "string", default: "" },
  email: { type: "string", default: "" },
  publishedAt: { type: "string", optional: true },
  pages: { type: "number", optional: true },
  century: { type: "string", optional: true },
  genre: { type: "array", default: [] },
  category: { type: "string", optional: true },
  abstract: { type: "string", default: "" }
});

module.exports = Metadata;