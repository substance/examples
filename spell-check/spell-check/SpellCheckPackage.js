import { EditAnnotationCommand } from 'substance'
import SpellError from './SpellError'
import CorrectionTool from './CorrectionTool'
import SpellCheckCommand from './SpellCheckCommand'

export default {
  name: 'spell-check',
  configure: function(config) {
    config.addToolGroup('context-menu-spell-check')
    config.addNode(SpellError)
    config.addCommand('correction', SpellCheckCommand)
    config.addTool('correction', CorrectionTool, {toolGroup: 'context-menu-spell-check'})
  }
}
