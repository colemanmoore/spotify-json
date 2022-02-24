#!/usr/bin/env node

const fs = require('fs')
const changes = require('./src/changes.js')

let inputJSON
const args = process.argv.slice(2)

try {
    const input_path = args[0]
    const data = fs.readFileSync(input_path)
    inputJSON = JSON.parse(data)
} catch (error) {
    console.error('Could not load or parse input / spotify.json', error)
    process.exit(1)
}

let changesJSON

try {
    const changes_path = args[1]
    const data = fs.readFileSync(changes_path)
    changesJSON = JSON.parse(data)
} catch (error) {
    console.error('Could not load or parse changes file', error)
    process.exit(1)
}

console.log('Processing changes...')
const result = changes.process(inputJSON, changesJSON)

try {
    const output_path = args[2] || './output.json'
    fs.writeFileSync(output_path, JSON.stringify(result, null, 4))
} catch (error) {
    console.error('Could not write output JSON', error)
    process.exit(1)
}

console.log('Done')