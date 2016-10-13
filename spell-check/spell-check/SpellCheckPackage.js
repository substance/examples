import { EditAnnotationCommand } from 'substance'
import SpellError from './SpellError'
import CorrectionTool from './CorrectionTool'

export default {
  name: 'spell-check',
  configure: function(config) {
    config.addNode(SpellError)
    config.addCommand('correction', EditAnnotationCommand, {nodeType: 'spell-error'})
    config.addTool('correction', CorrectionTool, {target: 'context-menu'})
  }
}
