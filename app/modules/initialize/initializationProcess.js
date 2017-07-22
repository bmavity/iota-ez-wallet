import { ipcMain } from 'electron'
import Worker from 'tiny-worker'


function getSeed() {
  return new Promise((resolve, reject) => {
    try {
      const seedWorker = new Worker('generateSeed.js', [], {
        cwd: __dirname,
      })
      seedWorker.onmessage = message => {
        resolve(message.data)
      }
    } catch (err) {
      reject(err)
    }
  })
}

function createGetAddresses() {
  const addressesWorker = new Worker('generateAddresses.js', [], {
    cwd: __dirname,
  })

  return (seed, blockNumber) => new Promise((resolve, reject) => {
    try {
      addressesWorker.onmessage = message => {
        resolve(message.data)
        addressesWorker.onmessage = null
      }
      addressesWorker.postMessage({ blockNumber, seed })
    } catch (err) {
      addressesWorker.onmessage = null
      reject(err)
    }
  })
}


ipcMain.on('create-new-wallet', async (event) => {
  let progress = 0

  function sendProgress() {
    progress += 4
    event.sender.send('initialization-progress', progress)
  }

  try {
    const seed = await getSeed()
    sendProgress()

    let addresses = []
    const getAddresses = createGetAddresses()
    addresses = addresses.concat(await getAddresses(seed, 1))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 2))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 3))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 4))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 5))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 6))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 7))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 8))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 9))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 10))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 11))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 12))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 13))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 14))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 15))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 16))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 17))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 18))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 19))
    sendProgress()

    addresses = addresses.concat(await getAddresses(seed, 20))
    sendProgress()

/*
    // const s1 = Array.from({ length: 100 }, (_, i) => generateAddress(seed, i, 1, true))
    // const s3 = Array.from({ length: 100 }, (_, i) => generateAddress(seed, i, 3, true))
*/
    sendProgress()
    sendProgress()
    sendProgress()
    sendProgress()
    event.sender.send('create-new-wallet-successful', 'Initialized')
  } catch (err) {
    console.log('Error with worker: ', err)
    event.sender.send('create-new-wallet-unsuccessful', err)
  }
})
