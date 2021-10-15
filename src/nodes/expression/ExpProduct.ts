import * as expressions from '.'
import { ExpProduct } from '../types'

export function compileExpProduct(exp: ExpProduct): string {
  const { compileExpression } = expressions

  return `${compileExpression(exp.left)} ${
    exp.operator.text
  } ${compileExpression(exp.right)}`
}
