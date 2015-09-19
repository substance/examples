module.exports = [
  require('substance/surface/commands/make_paragraph'),
  require('substance/surface/commands/make_heading1'),
  require('substance/surface/commands/make_heading2'),
  require('substance/surface/commands/make_heading3'),
  require('substance/surface/commands/make_blockquote'),
  require('substance/surface/commands/toggle_strong'),
  require('substance/surface/commands/toggle_emphasis'),
  require('substance/surface/commands/toggle_link'),
  require('./toggle_topic_citation')
];
