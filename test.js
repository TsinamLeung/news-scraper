const generiPool = require('generic-pool')
const { boolOptions } = require('yaml/types')

const opt = {
  max: 3,
  min: 1
}

function delay(ms) {
  return new Promise(rev => {
    setTimeout(resolve(rev), ms)
  })
}
let c = 0
const pool = generiPool.createPool({
  create: () => {
    console.log('created' + c)
    return {client: c++}
  },
  destroy: (cli) => {
    console.log('destoring ${cli.client}' + cli)
  }
},opt)

pool.acquire().then(client => {
  delay(2000).then(console.log('a'))
})
