import * as expressions from '.'
import { ExpComparison } from '../types'

export function compileExpComparison(exp: ExpComparison): string {
  const { compileExpression } = expressions

  const operator =
    exp.operator.text === '=='
      ? '==='
      : exp.operator.text === '!='
      ? '!=='
      : exp.operator.text

  return `${compileExpression(exp.left)} ${operator} ${compileExpression(
    exp.right
  )}`
}
