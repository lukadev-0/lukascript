import { compileIdentifierList } from './IdentifierList'
import { compileIdentifier } from './Identifier'
import { FunctionDef } from './types'
import { compileBlock } from './Block'

export function compileFunctionDef(functionDef: FunctionDef): string {
  return `function ${compileIdentifier(
    functionDef.name
  )}(${compileIdentifierList(functionDef.parameters)}) {\n${compileBlock(
    functionDef.body,
    1
  )}\n}`
}
