import InputNode from './InputNode'
import InputComponent from './InputComponent'

export default {
  name: 'input',
  configure: function(config) {
    config.addNode(InputNode)
    config.addComponent(InputNode.type, InputComponent)
    config.addLabel('input', 'Input')
  }
}