import moo from 'moo'
import * as expressions from '.'
import { Expression } from '../types'

export function compileExpression(expToken: Expression) {
  const exp = expToken as Exclude<Expression, moo.Token>
  switch (exp.type) {
    case 'ExpAnd':
      return expressions.compileExpAnd(exp)
    case 'ExpComparison':
      return expressions.compileExpComparison(exp)
    case 'ExpOr':
      return expressions.compileExpOr(exp)
    case 'ExpPow':
      return expressions.compileExpPow(exp)
    case 'ExpProduct':
      return expressions.compileExpProduct(exp)
    case 'ExpSum':
      return expressions.compileExpSum(exp)
    case 'ExpUnary':
      return expressions.compileExpUnary(exp)
    default:
      return expressions.compileExpBase(exp)
  }
}
