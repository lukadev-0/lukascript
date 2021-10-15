import { compileExpression } from './expression/Expression'
import { compileIdentifier } from './Identifier'
import { VariableDef } from './types'

export function compileVariableDef(variableDef: VariableDef) {
  return (
    `let ${compileIdentifier(variableDef.name)}` +
    (variableDef.value ? ' = ' + compileExpression(variableDef.value) : '')
  )
}
