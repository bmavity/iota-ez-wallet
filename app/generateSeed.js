import generateSeed from 'iota-seed-generator'

export default async () => {
  const seed = await generateSeed()
  return seed
}

