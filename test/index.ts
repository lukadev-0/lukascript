import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { createParser, Nodes } from '../src'
import { red } from 'chalk'

const parser = createParser()
const stream = createReadStream(join(__dirname, 'test.luka'))

stream.on('data', (data) => {
  try {
    console.log('Received Data!')
    parser.feed(data.toString())
  } catch (e) {
    console.error(red(e))
  }
})

stream.on('end', async () => {
  try {
    console.log('Finished reading file')

    if (parser.results.length !== 1)
      throw new Error(
        `Not Exactly 1 result, got ${parser.results.length} instead!`
      )

    const [result] = parser.results
    const parseTreeJSON = JSON.stringify(result, null, 2)
    await writeFile(join(__dirname, 'output.parse.json'), parseTreeJSON)
    console.log('Parse tree written')

    console.log('Compiling Code')
    const compiled = Nodes.compileBlock(result)
    await writeFile(join(__dirname, 'output.compiled.js'), compiled)
    console.log('Compiled')
  } catch (e) {
    console.error(red(e))
  }
})

stream.on('error', (e) => {
  console.error(red(e))
})
