import { compileExpression } from './expression/Expression'
import { ExpressionList } from './types'

export function compileExpressionList(exp: ExpressionList) {
  return exp.expressions.map((v) => v && compileExpression(v)).join(', ')
}
