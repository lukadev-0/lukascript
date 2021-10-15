import moo from 'moo'
import { compileIdentifier } from '../Identifier'
import { compileFunctionCall } from '../FunctionCall'
import { ExpBase } from '../types'
import { compileNumber } from '../Number'
import { compileString } from '../String'

export function compileExpBase(expToken: ExpBase) {
  const exp = expToken as Exclude<ExpBase, moo.Token>
  switch (exp.type) {
    case 'Identifier':
      return compileIdentifier(exp)
    case 'FunctionCall':
      return compileFunctionCall(exp)
    case 'FunctionDef':
      return '/* TODO: FunctionDef */' // TODO
    case 'Number':
      return compileNumber(exp)
    case 'String':
      return compileString(exp)
    default:
      return (expToken as moo.Token).text
  }
}
