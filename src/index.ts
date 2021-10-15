import { Parser, Grammar, ParserOptions } from 'nearley'

export const grammar = require('../nearley/lukascript')
export * from './lexer'

/**
 * Creates a Nearley parser.
 * @returns a Nearley parser
 */
export function createParser(options?: ParserOptions) {
  return new Parser(Grammar.fromCompiled(grammar), options)
}

/**
 * Parses code
 * @param data - the code to parse
 */
export function parse(data: string) {
  const parser = createParser()
  parser.feed(data)

  // Checks if the parser returned exactly 1 result
  if (parser.results.length !== 1)
    throw new Error('Parser did not return exactly 1 result.')

  return parser.results[0]
}

export * as Nodes from './nodes'
