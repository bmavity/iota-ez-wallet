// @flow
import * as t from './actions'

export type State = {
  completionPercentage: ?number,
  isInitializing: boolean,
  newWalletCreationComplete: boolean
};

const initialState: State = {
  completionPercentage: null,
  isInitializing: false,
  newWalletCreationComplete: false,
}


export default (state: State = initialState, action: t.Action): State => {
  switch (action.type) {
    case t.CREATING_NEW_WALLET:
      return { ...state, isInitializing: true }
    case t.CREATE_NEW_WALLET_SUCCESSFUL:
      return {
        ...state,
        newWalletCreationComplete: true,
      }
    case t.INITIALIZATION_PROGRESS:
      return {
        ...state,
        completionPercentage: action.payload.completionPercentage,
      }
    default:
      return state
  }
}
