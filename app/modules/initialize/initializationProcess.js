import { ipcMain } from 'electron'
import Iota from 'iota.lib.js'
import generateSeed from 'iota-seed-generator'

const generateAddress = new Iota().api._newAddress // eslint-disable-line no-underscore-dangle


function generateAddresses(seed, blockNumber, blockSize = 20) {
  const blockStartIndex = (blockNumber - 1) * blockSize
  return Array.from({ length: 20 }, (_, i) => generateAddress(seed, i + blockStartIndex, 2, true))
}

ipcMain.on('create-new-wallet', async (event) => {
  try {
    const seed = await generateSeed()
    event.sender.send('initialization-progress', 10)
    console.log('seed', seed)


    // const s1 = Array.from({ length: 100 }, (_, i) => generateAddress(seed, i, 1, true))
    let s2 = []
    s2 = s2.concat(generateAddresses(seed, 1))
    event.sender.send('initialization-progress', 20)

    s2 = s2.concat(generateAddresses(seed, 2))
    event.sender.send('initialization-progress', 30)

    s2 = s2.concat(generateAddresses(seed, 3))
    event.sender.send('initialization-progress', 40)

    s2 = s2.concat(generateAddresses(seed, 4))
    event.sender.send('initialization-progress', 50)

    s2 = s2.concat(generateAddresses(seed, 5))
    event.sender.send('initialization-progress', 60)

    // const s3 = Array.from({ length: 100 }, (_, i) => generateAddress(seed, i, 3, true))
    event.sender.send('create-new-wallet-successful', 'Initialized')
  } catch (err) {
    event.sender.send('create-new-wallet-unsuccessful', err)
  }
})
