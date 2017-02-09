import { AnnotationTool, InsertInlineNodeCommand, EditInlineNodeCommand } from 'substance'
import InlineImage from './InlineImage'
import InlineImageComponent from './InlineImageComponent'
import EditInlineImageTool from './EditInlineImageTool'


/*
  Package definition of your inline image plugin
*/
export default {
  name: 'inline-image',
  configure: function(config) {
    config.addNode(InlineImage)
    config.addComponent(InlineImage.type, InlineImageComponent)
    config.addCommand('add-inline-image', InsertInlineNodeCommand, {nodeType: InlineImage.type})
    config.addCommand('edit-inline-image', EditInlineNodeCommand, {nodeType: InlineImage.type})
    config.addTool('add-inline-image', AnnotationTool, { toolGroup: 'insert'})
    config.addTool('edit-inline-image', EditInlineImageTool, { toolGroup: 'overlay' })
    config.addIcon('add-inline-image', { 'fontawesome': 'fa-image' })
    config.addLabel('add-inline-image', 'Inline Image')
  }
}
