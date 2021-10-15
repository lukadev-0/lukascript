import moo from 'moo'
import IndentationLexer from 'moo-indentation-lexer'

const mooLexer = moo.compile({
  WS: /[ \t]+/,
  NL: { match: /\n/, lineBreaks: true },

  comment: /\/\/.*?$/,

  number: /-?(?:\d*\.)?\d+/,
  string: {
    match: /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/,
    value: (s) => s.slice(1, -1),
  },

  identifier: {
    match: /[a-zA-Z_]\w*/,
    type: moo.keywords({
      keyword: ['var', 'fn', 'return', 'true', 'false', 'null', 'undefined'],
    }),
  },

  lparan: '(',
  rparan: ')',
  comma: ',',
  lbracket: '[',
  rbracket: ']',
  lbrace: '{',
  rbrace: '}',

  lte: '<=',
  lt: '<',
  gte: '>=',
  gt: '>',
  eq: '==',
  nq: '!=',

  assignment: '=',
  plus: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  modulo: '%',
  pow: '^',

  or: '||',
  and: '&&',
  not: '!',
})

/**
 * Moo Lexer
 */
export const lexer = new IndentationLexer({
  lexer: mooLexer,
  indentationType: 'WS',
  newlineType: 'NL',
  commentType: 'comment',
})
