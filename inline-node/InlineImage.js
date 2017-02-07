import { InlineNode } from 'substance'

class InlineImage extends InlineNode {}

InlineImage.type = 'inline-image'
InlineImage.schema = {
  src: { type: 'string', 'default': './assets/smile.png'}
}

export default InlineImage