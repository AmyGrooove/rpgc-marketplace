import {
  action,
  computed,
  observable,
  makeAutoObservable,
  makeObservable,
  runInAction,
} from 'mobx'

import { apiClient } from '../providers/api'

import AmplifyStore from './AmplifyStore'

const { checkUserSession } = AmplifyStore

class MfaStore {
  public mfaEnable = {
    isGoogleEnabled: false,
    isSmsEnabled: false,
    isEmailEnabled: false,
  }

  public check2fa = () => {
    checkUserSession().then((response: any) => {
      apiClient
        .get('auth-2fa/is-enable', {
          headers: { Authorization: 'Bearer ' + response.jwtToken },
        })
        .then((response) => {
          runInAction(() => {
            this.mfaEnable = {
              isGoogleEnabled: response.data.isGoogleEnabled,
              isSmsEnabled: response.data.isSmsEnabled,
              isEmailEnabled: response.data.isEmailEnabled,
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  public enableGA = (code: string) => {
    checkUserSession().then((response: any) => {
      apiClient
        .get('auth-2fa/enable', {
          params: { auth2fa_code: code },
          headers: { Authorization: 'Bearer ' + response.jwtToken },
        })
        .then((response) => {
          runInAction(() => {
            this.mfaEnable = {
              isGoogleEnabled: response.data.isGoogleEnabled,
              isSmsEnabled: response.data.isSmsEnabled,
              isEmailEnabled: response.data.isEmailEnabled,
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  public disableGA = (code: string) => {
    checkUserSession().then((response: any) => {
      apiClient
        .get('auth-2fa/disable', {
          params: { auth2fa_code: code },
          headers: { Authorization: 'Bearer ' + response.jwtToken },
        })
        .then((response) => {
          runInAction(() => {
            this.mfaEnable = {
              isGoogleEnabled: response.data.isGoogleEnabled,
              isSmsEnabled: response.data.isSmsEnabled,
              isEmailEnabled: response.data.isEmailEnabled,
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new MfaStore()
