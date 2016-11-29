import { InsertNodeCommand } from 'substance'

class InsertContainerCommand extends InsertNodeCommand {

  createNodeData(tx) {
    let p = tx.createDefaultTextNode('Lorem ipsum.')
    return {
      type: 'container',
      nodes: [p.id]
    }
  }
}

export default InsertContainerCommand