// @flow
import { remote } from 'electron'

const initializeNewWallet = remote.require('./modules/initialize/initializationProcess').default

export const CREATE_SEED = 'initalize/CREATE_SEED'
export const CREATE_SEED_SUCCESSFUL = 'initalize/CREATE_SEED_SUCCESSFUL'
export const CREATE_SEED_UNSUCCESSFUL = 'initalize/CREATE_SEED_UNSUCCESSFUL'
export const CREATING_SEED = 'initalize/CREATING_SEED'
export const INITIALIZATION_PROGRESS = 'initalize/INITIALIZATION_PROGRESS'
export const SEED_CREATED = 'initalize/SEED_CREATED'


export const createSeed = () =>
  async dispatch => {
    dispatch(creatingSeed())

    try {
      const initializeResult = await initializeNewWallet()
      dispatch(createSeedSuccessful(initializeResult))
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

export const initializationProgress = (completionPercentage) => ({
  type: INITIALIZATION_PROGRESS,
  payload: {
    completionPercentage,
  }
})
