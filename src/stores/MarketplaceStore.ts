import {
  action,
  computed,
  observable,
  makeAutoObservable,
  makeObservable,
  runInAction,
} from 'mobx'

import { apiClient } from '../providers/api'

interface IItem {
  id: string;
  img: string;
  name: string;
  category: string;
  description: string;
  rare: string;
  maxPrice: string;
  minPrice: string;
  count: number;
  created: string;
  updatedAt: string;
}

class MarketplaceStore {
  public reload: boolean = false

  public setReload = (status: boolean) => {
    this.reload = status
  }

  public singleItem: IItem = {
    id: '',
    img: '',
    name: '',
    category: '',
    description: '',
    rare: '',
    maxPrice: '',
    minPrice: '',
    count: 0,
    created: '',
    updatedAt: '',
  }

  public UpdateSingleItem = (id: string) => {
    this.setReload(true)

    apiClient
      .get(`/shop/${id}?detail=true`)
      .then((response) => {
        runInAction(() => {
          this.singleItem = {
            ...this.singleItem,
            id: response.data.id,
            img: response.data.icon,
            name: response.data.desc,
            maxPrice: response.data.maxPrice,
            minPrice: response.data.minPrice,
            // rare: response.data.status,
            count: response.data.count,
            created: response.data.created,
            updatedAt: response.data.updatedAt,
          }
        })
        this.setReload(false)
      })
      .catch((error) => {
        console.log(error)
        this.setReload(false)
      })
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new MarketplaceStore()
