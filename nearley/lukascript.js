// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const { lexer } = require('../dist/lexer')

  function tokenLoc(token) {
    return {
      line: token.line,
      col: token.col,
    }
  }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Block", "symbols": ["Statement"], "postprocess": 
        d => ({ type: 'Block', statements: [d[0]] })
              },
    {"name": "Block", "symbols": ["Statement", "Block"], "postprocess": 
        d => ({
          type: 'Block',
          statements: [d[0], ...d[1].statements]
        })
              },
    {"name": "Block$subexpression$1", "symbols": ["__"]},
    {"name": "Block$subexpression$1", "symbols": [{"literal":"\n"}]},
    {"name": "Block", "symbols": ["Block$subexpression$1", "Block"], "postprocess": 
        d => ({
          type: 'Block',
          statements: d[1].statements
        })
              },
    {"name": "Block$subexpression$2", "symbols": ["Dedent"]},
    {"name": "Block$subexpression$2", "symbols": ["_"]},
    {"name": "Block", "symbols": ["Block$subexpression$2"], "postprocess": 
        d => ({
          type: 'Block',
          statements: []
        })
              },
    {"name": "Statement", "symbols": ["Assignment"], "postprocess": id},
    {"name": "Statement", "symbols": ["VariableDef"], "postprocess": id},
    {"name": "Statement", "symbols": ["FunctionDef"], "postprocess": id},
    {"name": "Statement", "symbols": ["Return"], "postprocess": id},
    {"name": "Statement", "symbols": ["FunctionCall"], "postprocess": id},
    {"name": "Return", "symbols": [{"literal":"return"}, "__", "Expression"], "postprocess": 
        d => ({ type: 'Return', value: d[2] })
              },
    {"name": "VariableDef", "symbols": [{"literal":"var"}, "__", "Assignment"], "postprocess": 
        d => ({
          type: 'VariableDef',
          name: d[2].name,
          value: d[2].value,
        })
              },
    {"name": "VariableDef", "symbols": [{"literal":"var"}, "__", "Identifier"], "postprocess": 
        d => ({
          type: 'VariableDef',
          name: d[2],
          value: null,
        })
              },
    {"name": "Assignment", "symbols": ["Identifier", "_", {"literal":"="}, "_", "Expression"], "postprocess":  
        d => ({
          type: 'Assignment',
          name: d[0],
          value: d[4],
        }) 
              },
    {"name": "ExpressionList", "symbols": [], "postprocess": d => ({ type: 'ExpressionList', expressions: [] })},
    {"name": "ExpressionList", "symbols": ["_", "Expression", "_"], "postprocess": d => ({ type: 'ExpressionList', expressions: [d[1]] })},
    {"name": "ExpressionList", "symbols": ["_", "Expression", "_", {"literal":","}, "ExpressionList"], "postprocess": 
        d => ({
          type: 'ExpressionList',
          expressions: [d[1], ...d[4].expressions]
        })  
              },
    {"name": "Expression", "symbols": ["ExpOr"], "postprocess": id},
    {"name": "ExpOr", "symbols": ["ExpOr", "_", {"literal":"||"}, "_", "ExpAnd"], "postprocess": d => ({ type: 'ExpOr', left: d[0], right: d[4] })},
    {"name": "ExpOr", "symbols": ["ExpAnd"], "postprocess": id},
    {"name": "ExpAnd", "symbols": ["ExpAnd", "_", {"literal":"&&"}, "_", "ExpComparison"], "postprocess": d => ({ type: 'ExpAnd', left: d[0], right: d[4] })},
    {"name": "ExpAnd", "symbols": ["ExpComparison"], "postprocess": id},
    {"name": "ExpComparison$subexpression$1", "symbols": [{"literal":"<"}]},
    {"name": "ExpComparison$subexpression$1", "symbols": [{"literal":">"}]},
    {"name": "ExpComparison$subexpression$1", "symbols": [{"literal":"<="}]},
    {"name": "ExpComparison$subexpression$1", "symbols": [{"literal":">="}]},
    {"name": "ExpComparison$subexpression$1", "symbols": [{"literal":"!="}]},
    {"name": "ExpComparison$subexpression$1", "symbols": [{"literal":"=="}]},
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", "ExpComparison$subexpression$1", "_", "ExpSum"], "postprocess":  d => 
        ({ type: 'ExpComparison', operator: d[2][0], left: d[0], right: d[4] })
              },
    {"name": "ExpComparison", "symbols": ["ExpSum"], "postprocess": id},
    {"name": "ExpSum$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "ExpSum$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "ExpSum", "symbols": ["ExpSum", "_", "ExpSum$subexpression$1", "_", "ExpProduct"], "postprocess":  d => 
        ({ type: 'ExpSum', operator: d[2][0], left: d[0], right: d[4] })
                                          },
    {"name": "ExpSum", "symbols": ["ExpProduct"], "postprocess": id},
    {"name": "ExpProduct$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "ExpProduct$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "ExpProduct$subexpression$1", "symbols": [{"literal":"%"}]},
    {"name": "ExpProduct", "symbols": ["ExpProduct", "_", "ExpProduct$subexpression$1", "_", "ExpUnary"], "postprocess":  d => 
        ({ type: 'ExpProduct', operator: d[2][0], left: d[0], right: d[4] })
                                          },
    {"name": "ExpProduct", "symbols": ["ExpUnary"], "postprocess": id},
    {"name": "ExpUnary$subexpression$1", "symbols": [{"literal":"!"}]},
    {"name": "ExpUnary$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "ExpUnary", "symbols": ["ExpUnary$subexpression$1", "ExpPow"], "postprocess": d => ({ type: 'ExpUnary', operator: d[0][0], value: d[1] })},
    {"name": "ExpUnary", "symbols": ["ExpPow"], "postprocess": id},
    {"name": "ExpPow", "symbols": ["ExpBase", "_", {"literal":"^"}, "_", "ExpPow"], "postprocess": d => ({ type: 'ExpPow', left: d[0], right: d[4] })},
    {"name": "ExpPow", "symbols": ["ExpBase"], "postprocess": id},
    {"name": "ExpBase", "symbols": ["Identifier"], "postprocess": id},
    {"name": "ExpBase", "symbols": ["FunctionCall"], "postprocess": id},
    {"name": "ExpBase", "symbols": ["Number"], "postprocess": id},
    {"name": "ExpBase", "symbols": ["String"], "postprocess": id},
    {"name": "ExpBase", "symbols": ["FunctionDef"], "postprocess": id},
    {"name": "ExpBase", "symbols": [{"literal":"true"}], "postprocess": id},
    {"name": "ExpBase", "symbols": [{"literal":"false"}], "postprocess": id},
    {"name": "ExpBase", "symbols": [{"literal":"undefined"}], "postprocess": id},
    {"name": "ExpBase", "symbols": [{"literal":"null"}], "postprocess": id},
    {"name": "FunctionDef", "symbols": [{"literal":"fn"}, "__", "Identifier", "_", {"literal":"("}, "_", "IdentifierList", "_", {"literal":")"}, "_", {"literal":"\n"}, "_", "Indent", "Block"], "postprocess": 
        d => ({
          type: 'FunctionDef',
          name: d[2],
          parameters: d[6],
          body: d[13],
        })
          },
    {"name": "FunctionCall", "symbols": ["Identifier", "_", {"literal":"("}, "_", "ExpressionList", "_", {"literal":")"}], "postprocess": 
        d => ({ type: 'FunctionCall', name: d[0], parameters: d[4] })
          },
    {"name": "Identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        d => ({
          type: 'Identifier',
          name: d[0].value,
          loc: tokenLoc(d[0]),
        })
              },
    {"name": "IdentifierList", "symbols": [], "postprocess": d => ({ type: 'IdentifierList', identifiers: [] })},
    {"name": "IdentifierList", "symbols": ["_", "Identifier", "_"], "postprocess": d => ({ type: 'IdentifierList', identifiers: [d[1]] })},
    {"name": "IdentifierList", "symbols": ["_", "Identifier", "_", {"literal":","}, "IdentifierList"], "postprocess": 
        d => ({
          type: 'IdentifierList',
          identifiers: [d[1], ...d[4].identifiers]
        })  
              },
    {"name": "Number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": d => ({ type: 'Number', value: d[0].value, loc: tokenLoc(d[0]) })},
    {"name": "String", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": d => ({ type: 'String', value: d[0].value, loc: tokenLoc(d[0]) })},
    {"name": "Indent", "symbols": [(lexer.has("indent") ? {type: "indent"} : indent)], "postprocess": () => null},
    {"name": "Dedent", "symbols": [(lexer.has("dedent") ? {type: "dedent"} : dedent)], "postprocess": () => null},
    {"name": "_$ebnf$1", "symbols": ["Whitespace"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "__", "symbols": ["Whitespace"], "postprocess": () => null},
    {"name": "Whitespace", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "Comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": () => null}
]
  , ParserStart: "Block"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
