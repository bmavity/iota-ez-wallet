// @flow

import * as t from './actions'
import type { State } from './model'

const initialState: State = {
  currentStep: 'Initializing',
  hasCreatedSeed: false,
  seed: null,
}


export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case t.CREATING_SEED:
      return { ...state, currentStep: 'CreatingSeed', }
    case t.CREATE_SEED_SUCCESSFUL:
      return {
        ...state,
        hasCreatedSeed: true,
        seed: action.payload.seed,
      }
    default:
      return state
  }
}
