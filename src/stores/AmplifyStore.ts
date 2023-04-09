import { resolve } from 'url'

import { Auth } from 'aws-amplify'
import { makeAutoObservable, runInAction } from 'mobx'

interface IUser {
  id: string;
  authenticated: boolean;
  account: string;
  email: string;
  email_verified: boolean;
  preferredMFA: string;
  wallet: string;
  jwtToken: string;
}

class AmplifyStore {
  public user: IUser = {
    id: '',
    authenticated: false,
    account: '',
    email: '',
    email_verified: false,
    preferredMFA: '',
    wallet: '',
    jwtToken: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  public login = async (username: string, password: string) => {
    await Auth.signIn(username, password)
      .then((response) => {
        runInAction(() => {
          this.user = {
            id: response.attributes.sub,
            authenticated: true,
            account: response.username,
            email: response.attributes.email,
            email_verified: response.attributes.email_verified,
            preferredMFA: response.preferredMFA,
            wallet: response.storage.wallet,
            jwtToken: response.signInUserSession.idToken.jwtToken,
          }
        })
      })
      .catch(() => {
        runInAction(() => {
          this.user = {
            id: '',
            authenticated: false,
            account: '',
            email: '',
            email_verified: false,
            preferredMFA: '',
            wallet: '',
            jwtToken: '',
          }
        })
      })
  }

  public logOut = async () => {
    await Auth.signOut()
    runInAction(() => {
      this.user = {
        id: '',
        authenticated: false,
        account: '',
        email: '',
        email_verified: false,
        preferredMFA: '',
        wallet: '',
        jwtToken: '',
      }
    })
  }

  public checkUserSession = async () => {
    return new Promise(async (resolve) => {
      await Auth.currentAuthenticatedUser()
        .then((response) => {
          runInAction(() => {
            this.user = {
              id: response.attributes.sub,
              authenticated: true,
              account: response.username,
              email: response.attributes.email,
              email_verified: response.attributes.email_verified,
              preferredMFA: response.preferredMFA,
              wallet: response.storage.wallet,
              jwtToken: response.signInUserSession.idToken.jwtToken,
            }
          })
        })
        .catch(() => {
          runInAction(() => {
            this.user = {
              id: '',
              authenticated: false,
              account: '',
              email: '',
              email_verified: false,
              preferredMFA: '',
              wallet: '',
              jwtToken: '',
            }
          })
        })
      resolve(this.user)
    })
  }
}

export default new AmplifyStore()
