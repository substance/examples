var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var Comment = ContainerAnnotation.extend({
  name: "comment",
  properties: {
    "content": "string"
  }
});

module.exports = Comment;