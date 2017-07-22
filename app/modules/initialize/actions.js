// @flow
import { ipcRenderer } from 'electron'


type CreateNewWalletSuccessfulName = 'initialize/CREATE_NEW_WALLET_SUCCESSFUL';
type CreateNewWalletSuccessful = {
  type: CreateNewWalletSuccessfulName
};
export const CREATE_NEW_WALLET_SUCCESSFUL: CreateNewWalletSuccessfulName = 'initialize/CREATE_NEW_WALLET_SUCCESSFUL'
export const createNewWalletSuccessful: (void) => CreateNewWalletSuccessful = () => ({
  type: 'initialize/CREATE_NEW_WALLET_SUCCESSFUL',
})

type CreateNewWalletUnsuccessfulName = 'initialize/CREATE_NEW_WALLET_UNSUCCESSFUL';
type CreateNewWalletUnsuccessful = {
  type: CreateNewWalletUnsuccessfulName,
  error: true,
  payload: Error
};
export const CREATE_NEW_WALLET_UNSUCCESSFUL: CreateNewWalletUnsuccessfulName = 'initialize/CREATE_NEW_WALLET_UNSUCCESSFUL'
export const createNewWalletUnsuccessful: Error => CreateNewWalletUnsuccessful = (err: Error) => ({
  type: 'initialize/CREATE_NEW_WALLET_UNSUCCESSFUL',
  payload: err,
  error: true,
})

type CreatingNewWalletName = 'initialize/CREATING_NEW_WALLET';
type CreatingNewWallet = {
  type: CreatingNewWalletName
};
export const CREATING_NEW_WALLET: CreatingNewWalletName = 'initialize/CREATING_NEW_WALLET'
export const creatingNewWallet: void => CreatingNewWallet = () => ({
  type: CREATING_NEW_WALLET,
})

type InitializationProgressName = 'initialize/INITIALIZATION_PROGRESS';
type InitializationProgress = {
  type: InitializationProgressName,
  payload: {
    completionPercentage: number
  }
};
export const INITIALIZATION_PROGRESS: InitializationProgressName = 'initialize/INITIALIZATION_PROGRESS'
export const initializationProgress: number => InitializationProgress = completionPercentage => ({
  type: INITIALIZATION_PROGRESS,
  payload: {
    completionPercentage,
  }
})


type CreateNewWalletName = 'initialize/CREATE_NEW_WALLET';
type CreateNewWallet = {
  type: 'initialize/CREATE_NEW_WALLET'
};
export const CREATE_NEW_WALLET: CreateNewWalletName = 'initialize/CREATE_NEW_WALLET'


export type Action = InitializationProgress
  | CreateNewWallet
  | CreateNewWalletSuccessful
  | CreateNewWalletUnsuccessful
  | CreatingNewWallet
  | InitializationProgress
  | any
;
type Dispatch = (action: Action) => void;


export const createNewWallet: void => Dispatch => void = () =>
  (dispatch: Dispatch) => {
    dispatch(creatingNewWallet())

    ipcRenderer.on('create-new-wallet-successful',
      () => dispatch(createNewWalletSuccessful())
    )

    ipcRenderer.on('create-new-wallet-unsuccessful',
      (event, err) => dispatch(createNewWalletUnsuccessful(err))
    )

    ipcRenderer.on('initialization-progress',
      (event, completionPercentage) => dispatch(initializationProgress(completionPercentage))
    )

    ipcRenderer.send('create-new-wallet')
  }

