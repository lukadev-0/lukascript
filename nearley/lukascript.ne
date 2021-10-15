@{%
  const { lexer } = require('../dist/lexer')

  function tokenLoc(token) {
    return {
      line: token.line,
      col: token.col,
    }
  }
%}

@lexer lexer

Block 
   -> Statement
      {%
        d => ({ type: 'Block', statements: [d[0]] })
      %}
    | Statement Block
      {%
        d => ({
          type: 'Block',
          statements: [d[0], ...d[1].statements]
        })
      %}
    | (__ | "\n") Block
      {%
        d => ({
          type: 'Block',
          statements: d[1].statements
        })
      %}
    | (Dedent | _)
      {%
        d => ({
          type: 'Block',
          statements: []
        })
      %}

# Statements
Statement
   -> Assignment   {% id %}
    | VariableDef  {% id %}
    | FunctionDef  {% id %}
    | Return       {% id %}
    | FunctionCall {% id %}

Return 
   -> "return" __ Expression        
      {%
        d => ({ type: 'Return', value: d[2] })
      %}

VariableDef 
   -> "var" __ Assignment
      {%
        d => ({
          type: 'VariableDef',
          name: d[2].name,
          value: d[2].value,
        })
      %}
    | "var" __ Identifier
      {%
        d => ({
          type: 'VariableDef',
          name: d[2],
          value: null,
        })
      %}

Assignment 
   -> Identifier _ "=" _ Expression 
      {% 
        d => ({
          type: 'Assignment',
          name: d[0],
          value: d[4],
        }) 
      %}

# Expressions
ExpressionList
   -> null
      {% d => ({ type: 'ExpressionList', expressions: [] }) %}
    | _ Expression _    
      {% d => ({ type: 'ExpressionList', expressions: [d[1]] }) %}
    | _ Expression _ "," ExpressionList
      {%
        d => ({
          type: 'ExpressionList',
          expressions: [d[1], ...d[4].expressions]
        })  
      %}

Expression
   -> ExpOr {% id %}

ExpOr 
   -> ExpOr _ "||" _ ExpAnd         {% d => ({ type: 'ExpOr', left: d[0], right: d[4] }) %}
  | ExpAnd                        {% id %}
ExpAnd -> 
    ExpAnd _ "&&" _ ExpComparison {% d => ({ type: 'ExpAnd', left: d[0], right: d[4] }) %}
  | ExpComparison                 {% id %}
ExpComparison ->                                                      
    ExpComparison _ (
        "<"
      | ">" 
      | "<=" 
      | ">=" 
      | "!=" 
      | "=="
    ) _ ExpSum                    {% d => 
        ({ type: 'ExpComparison', operator: d[2][0], left: d[0], right: d[4] })
      %}
  | ExpSum                        {% id %}
ExpSum -> 
    ExpSum _ (
        "+" 
      | "-"
    ) _ ExpProduct                {% d => 
                                    ({ type: 'ExpSum', operator: d[2][0], left: d[0], right: d[4] })
                                  %}
  | ExpProduct                    {% id %}
ExpProduct -> 
    ExpProduct _ (
        "*"
      | "/" 
      | "%"
    ) _ ExpUnary                  {% d => 
                                    ({ type: 'ExpProduct', operator: d[2][0], left: d[0], right: d[4] })
                                  %}
  | ExpUnary                      {% id %}
ExpUnary ->
    ("!" | "-") ExpPow            {% d => ({ type: 'ExpUnary', operator: d[0][0], value: d[1] }) %}
  | ExpPow                        {% id %}
ExpPow 
   -> ExpBase _ "^" _ ExpPow 
      {% d => ({ type: 'ExpPow', left: d[0], right: d[4] }) %}
    | ExpBase                       {% id %}

ExpBase 
   -> Identifier    {% id %}
    | FunctionCall  {% id %}
    | Number        {% id %}
    | String        {% id %}
    | FunctionDef   {% id %}
    | "true"        {% id %}
    | "false"       {% id %}
    | "undefined"   {% id %}
    | "null"        {% id %}

# Functions
FunctionDef ->
  "fn" __ Identifier _ "(" _ IdentifierList _  ")" _ "\n" _ Indent Block
  {%
    d => ({
      type: 'FunctionDef',
      name: d[2],
      parameters: d[6],
      body: d[13],
    })
  %}

FunctionCall ->
  Identifier _ "(" _ ExpressionList _ ")"
  {%
    d => ({ type: 'FunctionCall', name: d[0], parameters: d[4] })
  %}

# Identifier
Identifier
   -> %identifier             
      {%
        d => ({
          type: 'Identifier',
          name: d[0].value,
          loc: tokenLoc(d[0]),
        })
      %}

IdentifierList
   -> null
      {% d => ({ type: 'IdentifierList', identifiers: [] }) %}
    | _ Identifier _    
      {% d => ({ type: 'IdentifierList', identifiers: [d[1]] }) %}
    | _ Identifier _ "," IdentifierList
      {%
        d => ({
          type: 'IdentifierList',
          identifiers: [d[1], ...d[4].identifiers]
        })  
      %}

# Primitives
Number 
   -> %number {% d => ({ type: 'Number', value: d[0].value, loc: tokenLoc(d[0]) }) %}
String
   -> %string {% d => ({ type: 'String', value: d[0].value, loc: tokenLoc(d[0]) }) %}

# Whitespace
Indent -> %indent   {% () => null %}
Dedent -> %dedent   {% () => null %}

_  -> Whitespace:?  {% () => null %}
__ -> Whitespace    {% () => null %}
Whitespace -> %WS

Comment -> %comment {% () => null %}
