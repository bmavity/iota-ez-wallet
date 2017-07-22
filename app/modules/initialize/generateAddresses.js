const Iota = require('iota.lib.js')

const generateAddress = new Iota().api._newAddress // eslint-disable-line no-underscore-dangle

function generateAddresses(seed, blockNumber, securityLevel = 2, blockSize = 5) {
  const blockStartIndex = (blockNumber - 1) * blockSize
  return Array.from({ length: blockSize }, (_, i) => generateAddress(seed, i + blockStartIndex, securityLevel, true))
}

onmessage = message => {
  const data = message.data
  const addresses = generateAddresses(data.seed, data.blockNumber)
  postMessage(addresses)
}
