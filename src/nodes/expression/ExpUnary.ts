import * as expressions from '.'
import { ExpUnary } from '../types'

export function compileExpUnary(exp: ExpUnary): string {
  const { compileExpression } = expressions

  return `${exp.operator.text}${compileExpression(exp.value)}`
}
