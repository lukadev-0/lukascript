declare module 'moo-indentation-lexer' {
  export interface LexerOptions {
    lexer: moo.Lexer
    indentationType?: string
    newlineType?: string
    commentType?: string
    indentName?: string
    dedentName?: string
    enclosingPunctuations?: Record<string, string>
    separators?: string[]
  }

  export default class IndentationLexer {
    constructor(options: LexerOptions)

    /**
     * Returns a string with a pretty error message.
     */
    formatError(token: Token, message?: string): string
    /**
     * @deprecated since 0.5.0. Now just returns true
     */
    has(tokenType: string): boolean
    /**
     * When you reach the end of Moo's internal buffer, next() will return undefined.
     * You can always reset() it and feed it more data when that happens.
     */
    next(): Token | undefined
    /**
     * Empty the internal buffer of the lexer, and set the line, column, and offset counts back to their initial value.
     */
    reset(chunk?: string, state?: LexerState): this
    /**
     * Returns current state, which you can later pass it as the second argument
     * to reset() to explicitly control the internal state of the lexer.
     */
    save(): LexerState
    /**
     * Transitions to the provided state and pushes the state onto the state
     * stack.
     */
    pushState(state: string): void
    /**
     * Returns back to the previous state in the stack.
     */
    popState(): void
    /**
     * Transitiosn to the provided state. Does not push onto the state stack.
     */
    setState(state: string): void

    [Symbol.iterator](): Iterator<Token>
  }
}
