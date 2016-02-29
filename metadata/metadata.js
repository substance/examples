'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function Metadata() {
  Metadata.super.apply(this, arguments);
}

DocumentNode.extend(Metadata);

Metadata.static.name = "metadata";

Metadata.static.defineSchema({
  author: { type: "string", default: "", field: { type: "text", dataType: "text", placeholder: "Enter author's name" }},
  published: { type: "boolean", default: false, field: { type: "checkbox" }},
  source: { type: "string", default: "", field: { type: "text", dataType: "url", placeholder: "Enter source url" }},
  email: { type: "string", default: "", field: { type: "text", dataType: "email", placeholder: "Enter publisher e-mail" }},
  publishedAt: { type: "string", optional: true, field: { type: "date", placeholder: "Tale published at" }},
  pages: { type: "number", optional: true, field: { type: "text", dataType: "number", placeholder: "Number of pages" }},
  century: { type: "string", optional: true, field: { type: "select", options: ['XVII', 'XVIII', 'XIX', 'XX', 'XXI'], placeholder: "Written in centery" }},
  genre: { type: "array", default: [], field: { type: "checkboxes", options: ['Fairy tales', 'Folklore'], placeholder: "Genre of tale" }},
  category: { type: "string", optional: true, field: { type: "radio", options: ['folktale', 'author\'s tale'], placeholder: "Type of tail" }},
  abstract: { type: "string", default: "", field: { type: "textarea", placeholder: "Enter tale abstract" }}
});

module.exports = Metadata;