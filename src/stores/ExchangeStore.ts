import { makeAutoObservable, runInAction } from 'mobx'

import { ItemShort } from '../dependencies/constants/types'
import { apiClient } from '../providers/api'

import AmplifyStore from './AmplifyStore'

const { checkUserSession } = AmplifyStore

class ExchangeStore {
  public itemsList: ItemShort[] = []

  public count: number = 0
  public items: ItemShort[] = []
  public itemsBuf: ItemShort[] = []

  public startItems = () => {
    this.count = 0
    this.items = []
    this.itemsBuf = []
  }

  public copyItems = () => {
    this.itemsBuf = this.items
  }

  public addItem = (id: string) => {
    const newItem = this.itemsList.find((el) => el.id === id)

    if (newItem !== undefined) {
      let newArray = this.itemsBuf
      newArray.push(newItem)
      this.itemsBuf = newArray

      this.count++
    }
  }

  public removeItem = (id: string, now?: boolean) => {
    const deleteItemIndex = (now ? this.items : this.itemsBuf).findIndex(
      (el) => el.id === id,
    )

    let newArray = now ? this.items : this.itemsBuf
    newArray.splice(deleteItemIndex, 1)

    if (now) {
      this.items = newArray
    } else {
      this.itemsBuf = newArray
    }

    if (deleteItemIndex !== -1) {
      this.count--
    }
  }

  public applyItems = () => {
    this.items = this.itemsBuf
  }

  public clearItems = () => {
    this.count = 0
    this.itemsBuf = []
  }

  public updateItems = (tranType: string, saleId: string) => {
    checkUserSession().then((response: any) => {
      if (tranType === 'exchangeuser') {
        apiClient
          .get(`/user/${saleId}/inventory`, {
            headers: { Authorization: 'Bearer ' + response.jwtToken },
          })
          .then((response) => {
            runInAction(() => {
              this.itemsList = response.data.data
            })
          })
          .catch(() => {
            runInAction(() => {
              this.itemsList = []
            })
          })
      } else {
        apiClient
          .get('/user/inventory', {
            headers: { Authorization: 'Bearer ' + response.jwtToken },
          })
          .then((response) => {
            runInAction(() => {
              this.itemsList = response.data.data
            })
          })
          .catch(() => {
            runInAction(() => {
              this.itemsList = []
            })
          })
      }
    })
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new ExchangeStore()
