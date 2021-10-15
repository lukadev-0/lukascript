import * as expressions from '.'
import { ExpAnd } from '../types'

export function compileExpAnd(exp: ExpAnd): string {
  const { compileExpression } = expressions

  return `${compileExpression(exp.left)} && ${compileExpression(exp.right)}`
}
