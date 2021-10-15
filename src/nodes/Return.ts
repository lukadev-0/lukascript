import { compileExpression } from './expression/Expression'
import { Return } from './types'

export function compileReturn(ret: Return) {
  return `return ${compileExpression(ret.value)}`
}
