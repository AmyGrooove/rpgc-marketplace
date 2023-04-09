import { makeAutoObservable } from 'mobx'

class TransactionStore {
  public userBalance = '0.0000'
  public price = '0.0000'
  public commission = '0.0000'

  public saleName = ''
  public icon = ''

  public setUser = (saleName: string, icon: string) => {
    this.saleName = saleName
    this.icon = icon
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new TransactionStore()
