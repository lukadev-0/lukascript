import { compileExpressionList } from './ExpressionList'
import { compileIdentifier } from './Identifier'
import { FunctionCall } from './types'

export function compileFunctionCall(functionCall: FunctionCall): string {
  return `${compileIdentifier(functionCall.name)}(${compileExpressionList(
    functionCall.parameters
  )})`
}
