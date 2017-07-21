// @flow
import { ipcRenderer } from 'electron'


export const CREATE_NEW_WALLET = 'initalize/CREATE_NEW_WALLET'
export const CREATE_SEED = 'initalize/CREATE_SEED'
export const CREATE_SEED_SUCCESSFUL = 'initalize/CREATE_SEED_SUCCESSFUL'
export const CREATE_SEED_UNSUCCESSFUL = 'initalize/CREATE_SEED_UNSUCCESSFUL'
export const CREATING_SEED = 'initalize/CREATING_SEED'
export const INITIALIZATION_PROGRESS = 'initalize/INITIALIZATION_PROGRESS'
export const SEED_CREATED = 'initalize/SEED_CREATED'


export const createNewWallet = () =>
  async dispatch => {
    dispatch(creatingSeed())

    ipcRenderer.on('create-new-wallet-successful', (event, initializeResult) => dispatch(createSeedSuccessful(initializeResult)))
    ipcRenderer.on('create-new-wallet-unsuccessful', (event, err) => dispatch(createSeedUnsuccessful(err)))
    ipcRenderer.on('initialization-progress', (event, completionPercentage) => dispatch(initializationProgress(completionPercentage)))

    ipcRenderer.send('create-new-wallet')
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
