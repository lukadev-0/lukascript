import * as expressions from '.'
import { ExpOr } from '../types'

export function compileExpOr(exp: ExpOr): string {
  const { compileExpression } = expressions

  return `${compileExpression(exp.left)} || ${compileExpression(exp.right)}`
}
