import { AnnotationTool } from 'substance'
import Expression from './Expression'
import ExpressionComponent from './ExpressionComponent'
import ExpressionCommand from './ExpressionCommand'
import EditExpressionCommand from './EditExpressionCommand'
import EditExpressionTool from './EditExpressionTool'

export default {
  name: 'expression',
  configure: function(config) {
    config.addNode(Expression)
    config.addComponent(Expression.type, ExpressionComponent)
    config.addCommand('expression', ExpressionCommand, {
      nodeType: Expression.type,
      commandGroup: 'annotations'
    })
    config.addIcon('expression', { 'fontawesome': 'fa-cube' })
    config.addCommand('edit-expression', EditExpressionCommand, {
      nodeType: 'expression',
      commandGroup: 'prompt'
    })
    config.addTool('edit-expression', EditExpressionTool, {toolGroup: 'overlay'})
    config.addIcon('edit-value', { 'fontawesome': 'fa-edit' })
    config.addIcon('confirm-value', { 'fontawesome': 'fa-check' })
    config.addIcon('drag-value', { 'fontawesome': ' fa-arrows-h' })
  }
}
