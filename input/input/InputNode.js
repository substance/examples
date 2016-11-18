import { DocumentNode } from 'substance'

class InputNode extends DocumentNode {}

InputNode.defineSchema({
  type: 'input-node',
  content: { type: 'string', default: '' }
})

export default InputNode