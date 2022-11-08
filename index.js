let { existsSync, mkdirSync, rmSync, writeFileSync } = require('fs')
let https = require('https')
let { join } = require('path')
let dir = join(__dirname, 'folder')
let file = join(dir, 'hi.txt')

async function main () {
  if (existsSync(dir)) {
    console.log(`please ensure folder (and contents) do not exist before running this test: ${dir}`)
    process.exit(1)
  }

  mkdirSync(dir, { recursive: true })
  writeFileSync(file, 'hi!')

  let result = await new Promise((resolve, reject) => {
    let url = 'https://google.com'
    https.get(url, res => {
      let body = []
      res.on('data', data => {
        body.push(data)
      })
      res.on('end', data => {
        if (data) body.push(data)
        body = Buffer.concat(body).toString()
        console.log(body.substr(0,25))
        resolve('Loaded the googles!')
      })
      res.on('err', err => {
        reject(err)
      })
    })
  })

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
}

async function go () {
  await main()
  await main()
}
go()
