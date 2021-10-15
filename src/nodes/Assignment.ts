import { compileExpression } from './expression/Expression'
import { compileIdentifier } from './Identifier'
import { Assignment } from './types'

export function compileAssignment(assignment: Assignment) {
  return `${compileIdentifier(assignment.name)} = ${compileExpression(
    assignment.value
  )}`
}
