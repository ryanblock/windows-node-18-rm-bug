let { existsSync, mkdirSync, rmSync, writeFileSync } = require('fs')
let { join } = require('path')
let dir = join(__dirname, 'folder')
let file = join(dir, 'hi.txt')

if (existsSync(dir)) {
  console.log(`please ensure folder (and contents) do not exist before running this test: ${dir}`)
  process.exit(1)
}

mkdirSync(dir, { recursive: true })
writeFileSync(file, 'hi!')

if (!existsSync(file)) {
  console.log(`something went wrong setting things up: ${file}`)
  process.exit(1)
}

try {
  rmSync(dir, { recursive: true, force: true })
}
catch (err) {
  console.log(`error during rm: ${dir}`)
  console.log(err)
  process.exit(1)
}

if (existsSync(dir)) {
  console.log(`node failed to rm: ${dir}`)
  process.exit(1)
}
else {
  console.log(`rm success: ${dir}`)
}
