import Iota from 'iota.lib.js'
import generateSeed from 'iota-seed-generator'

const generateAddress = new Iota().api._newAddress


let webContents = null

function toPromise(fn) {
  return new Promise((resolve, reject) =>
    fn((err, result) => (err ? reject(err) : resolve(result)))
  )
}

export const registerMainWindow = contents => {
  webContents = contents
}

function generateAddresses(seed, blockNumber, blockSize = 20) {
  const blockStartIndex = (blockNumber - 1) * blockSize
  return Array.from({ length: 20 }, (_, i) => generateAddress(seed, i + blockStartIndex, 2, true))
}

export default async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const seed = await generateSeed()
      webContents.send('initializationProgress', 10)
      console.log('seed', seed)


      // const s1 = Array.from({ length: 100 }, (_, i) => generateAddress(seed, i, 1, true))
      let s2 = []
      s2 = s2.concat(generateAddresses(seed, 1))
      webContents.send('initializationProgress', 20)

      s2 = s2.concat(generateAddresses(seed, 2))
      webContents.send('initializationProgress', 30)

      s2 = s2.concat(generateAddresses(seed, 3))
      webContents.send('initializationProgress', 40)

      s2 = s2.concat(generateAddresses(seed, 4))
      webContents.send('initializationProgress', 50)

      s2 = s2.concat(generateAddresses(seed, 5))
      webContents.send('initializationProgress', 60)

      // const s3 = Array.from({ length: 100 }, (_, i) => generateAddress(seed, i, 3, true))
      resolve('Initialized')
    } catch (err) {
      reject(err)
    }
  })
}
