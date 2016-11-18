import { InsertNodeCommand, insertNode } from 'substance'

class InsertContainerCommand extends InsertNodeCommand {

  insertNode(tx, args) {
    let textType = tx.getSchema().getDefaultTextType()
    let p = tx.create({
      type: textType,
      content: 'Lorem ipsum'
    })
    args.node = {
      type: 'container',
      nodes: [p.id]
    }
    return insertNode(tx, args)
  }
}

export default InsertContainerCommand