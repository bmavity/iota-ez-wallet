// @flow

import { remote } from 'electron'

const generateSeed = remote.require('./generateSeed')

export const CREATE_SEED = 'initalize/CREATE_SEED'
export const CREATE_SEED_SUCCESSFUL = 'initalize/CREATE_SEED_SUCCESSFUL'
export const CREATE_SEED_UNSUCCESSFUL = 'initalize/CREATE_SEED_UNSUCCESSFUL'
export const CREATING_SEED = 'initalize/CREATING_SEED'
export const SEED_CREATED = 'initalize/SEED_CREATED'


export const createSeed = () =>
  async dispatch => {
    dispatch(creatingSeed())

    try {
      const seed = await generateSeed()
      dispatch(createSeedSuccessful(seed))
    } catch (err) {
      dispatch(createSeedUnsuccessful(err))
    }
  }

export const createSeedSuccessful = (seed) => ({
  type: CREATE_SEED_SUCCESSFUL,
  payload: { seed, },
})

export const createSeedUnsuccessful = (err) => ({
  type: CREATE_SEED_UNSUCCESSFUL,
  payload: err,
  error: true,
})

export const creatingSeed = () => ({
  type: CREATING_SEED,
  payload: {},
})
