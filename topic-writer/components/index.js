module.exports = {
  // Writer UI
  'content_editor': require('./content_editor'),

  // Content Nodes
  'paragraph': require('substance/ui/nodes/paragraph_component'),
  'heading': require('substance/ui/nodes/heading_component'),
  'blockquote': require('substance/ui/nodes/blockquote_component'),
  'link': require('substance/ui/nodes/link_component'),

  // Panels
  "toc": require("substance/ui/writer/toc_panel"),
  "editTopicCitation": require('./edit_topic_citation_panel'),
  "editComment": require('./edit_comment_panel')
};