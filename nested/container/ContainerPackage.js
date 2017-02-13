import { Tool } from 'substance'
import ContainerComponent from './ContainerComponent'
import InsertContainerCommand from './InsertContainerCommand'

export default {
  name: 'container',
  configure: function(config) {
    config.addComponent('container', ContainerComponent)
    config.addCommand('insert-container', InsertContainerCommand)
    config.addTool('insert-container', Tool)
    config.addIcon('insert-container', { 'fontawesome': 'fa-align-justify' })
  }
}