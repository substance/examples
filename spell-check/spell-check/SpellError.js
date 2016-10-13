import { PropertyAnnotation } from 'substance'

class SpellError extends PropertyAnnotation {}

SpellError.define({
  type: 'spell-error',
  suggestions: { type: ['object'], default: [] }
})

export default SpellError
