
let webContents = null

export const registerMainWindow = contents => {
  webContents = contents
}

export default async () => {
  return new Promise((resolve, reject) => {
    try {
      let percentage = 0
      const cancel = setInterval(() => {
        if (percentage < 100) {
          percentage += 10
          webContents.send('initializationProgress', percentage)
        } else {
          clearInterval(cancel)
          resolve('Initialized')
        }
      }, 3000)
    } catch (err) {
      reject(err)
    }
  })
}
