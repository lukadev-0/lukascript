import { String } from './types'

export function compileString(string: String) {
  return JSON.stringify(string.value)
}
