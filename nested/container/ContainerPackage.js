import ContainerComponent from './ContainerComponent'
import InsertContainerCommand from './InsertContainerCommand'

export default {
  name: 'container',
  configure: function(config) {
    config.addComponent('container', ContainerComponent)
    config.addCommand('insert-container', InsertContainerCommand, {
      commandGroup: 'insert'
    })
    config.addIcon('insert-container', { 'fontawesome': 'fa-align-justify' })
  }
}
