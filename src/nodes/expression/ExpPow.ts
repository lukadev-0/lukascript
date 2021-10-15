import * as expressions from '.'
import { ExpPow } from '../types'

export function compileExpPow(exp: ExpPow): string {
  const { compileExpression } = expressions

  return `${compileExpression(exp.left)} ** ${compileExpression(exp.right)}`
}
