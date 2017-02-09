import { BlockNode } from 'substance'

class ExampleFigureNode extends BlockNode {}

ExampleFigureNode.type = 'figure'

ExampleFigureNode.schema = {
  url: 'string',
  caption: 'text'
}

export default ExampleFigureNode
