var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var Comment = ContainerAnnotation.extend({
  name: "comment",
  properties: {
    "content": "string",
    "creator": "string",
    "created_at": "date",
    "replies": ["array", "id"]
  }
});

module.exports = Comment;