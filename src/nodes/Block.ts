import { compileStatement } from './Statement'
import { Block } from './types'

export function compileBlock(block: Block, indentation: number = 0) {
  const indentStr = '  '.repeat(indentation)
  return block.statements
    .map(
      (v) => indentStr + compileStatement(v).replace(/\n/g, '\n' + indentStr)
    )
    .join('\n')
}
