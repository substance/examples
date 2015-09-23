var commands = [
  require('substance/ui/commands/undo'),
  require('substance/ui/commands/redo'),
  require('substance/ui/commands/save'),
  require('substance/ui/commands/make_paragraph'),
  require('substance/ui/commands/make_heading1'),
  require('substance/ui/commands/make_heading2'),
  require('substance/ui/commands/make_heading3'),
  require('substance/ui/commands/make_blockquote'),
  require('substance/ui/commands/toggle_strong'),
  require('substance/ui/commands/toggle_emphasis'),
  require('substance/ui/commands/toggle_link'),
  require('./toggle_topic_citation')
];

module.exports = commands;
