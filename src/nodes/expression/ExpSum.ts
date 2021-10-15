import * as expressions from '.'
import { ExpSum } from '../types'

export function compileExpSum(exp: ExpSum): string {
  const { compileExpression } = expressions

  return `${compileExpression(exp.left)} ${
    exp.operator.text
  } ${compileExpression(exp.right)}`
}
