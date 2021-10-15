import moo from 'moo'

export type Node =
  | String
  | Number
  | FunctionDef
  | FunctionCall
  | Expression
  | Identifier
  | IdentifierList
  | Block
  | Statement

export interface Block {
  type: 'Block'
  statements: Statement[]
}

// STATEMENTS
export type Statement =
  | VariableDef
  | Assignment
  | Return
  | FunctionDef
  | FunctionCall

export interface Return {
  type: 'Return'
  value: Expression
}

export interface VariableDef {
  type: 'VariableDef'
  name: Identifier
  value: Expression
}

export interface Assignment {
  type: 'Assignment'
  name: Identifier
  value: Expression
}

// EXPRESSIONS
export interface ExpressionList {
  type: 'ExpressionList'
  expressions: Expression[]
}

export type Expression =
  | ExpBase
  | ExpPow
  | ExpUnary
  | ExpProduct
  | ExpSum
  | ExpComparison
  | ExpAnd
  | ExpOr

export interface ExpOr {
  type: 'ExpOr'
  left: Expression
  right: Expression
}

export interface ExpAnd {
  type: 'ExpAnd'
  left: Expression
  right: Expression
}

export interface ExpComparison {
  type: 'ExpComparison'
  operator: moo.Token
  left: Expression
  right: Expression
}

export interface ExpSum {
  type: 'ExpSum'
  operator: moo.Token
  left: Expression
  right: Expression
}

export interface ExpProduct {
  type: 'ExpProduct'
  operator: moo.Token
  left: Expression
  right: Expression
}

export interface ExpUnary {
  type: 'ExpUnary'
  operator: moo.Token
  value: Expression
}

export interface ExpPow {
  type: 'ExpPow'
  left: Expression
  right: Expression
}

export type ExpBase =
  | Identifier
  | FunctionCall
  | Number
  | String
  | FunctionDef
  | moo.Token

// FUNCTIONS
export interface FunctionDef {
  type: 'FunctionDef'
  name: Identifier
  parameters: IdentifierList
  body: Block
}

export interface FunctionCall {
  type: 'FunctionCall'
  name: Identifier
  parameters: ExpressionList
}

// IDENTIFIER
export interface Identifier {
  type: 'Identifier'
  name: string
  loc: TokenLoc
}

export interface IdentifierList {
  type: 'IdentifierList'
  identifiers: Identifier[]
}

// PRIMITIVES
export interface String {
  type: 'String'
  value: string
  loc: TokenLoc
}

export interface Number {
  type: 'Number'
  value: string
  loc: TokenLoc
}

// TOKEN LOCATION
export interface TokenLoc {
  line: number
  col: number
}
