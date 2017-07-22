const generateSeed = require('iota-seed-generator')

async function create() {
  try {
    const seed = await generateSeed()
    postMessage(seed)
  } catch (err) {
    postMessage(err)
  } finally {
    close()
  }
}
create()
