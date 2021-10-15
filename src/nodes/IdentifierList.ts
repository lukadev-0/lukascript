import { compileIdentifier } from './Identifier'
import { IdentifierList } from './types'

export function compileIdentifierList(identifierList: IdentifierList) {
  return identifierList.identifiers
    .map((v) => v && compileIdentifier(v))
    .join(', ')
}
