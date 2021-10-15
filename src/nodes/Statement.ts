import { compileAssignment } from './Assignment'
import { compileFunctionCall } from './FunctionCall'
import { compileFunctionDef } from './FunctionDef'
import { compileReturn } from './Return'
import { Statement } from './types'
import { compileVariableDef } from './VariableDef'

export function compileStatement(statement: Statement) {
  switch (statement.type) {
    case 'Assignment':
      return compileAssignment(statement)
    case 'FunctionCall':
      return compileFunctionCall(statement)
    case 'FunctionDef':
      return compileFunctionDef(statement)
    case 'Return':
      return compileReturn(statement)
    case 'VariableDef':
      return compileVariableDef(statement)
  }
}
