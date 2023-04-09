import { makeAutoObservable, runInAction } from 'mobx'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

import {
  BINANCE_NETWORK,
  NetworksList,
  SMART_CHAIN_TESTNET_NETWORK,
} from '../dependencies/constants/network'
import { NETWORK_TEST } from '../dependencies/constants'

class Web3Store {
  public isConnected: boolean = false
  public account: string = ''
  public isCorrectNetwork: boolean = false

  public provider: any = ''

  constructor() {
    makeAutoObservable(this)
  }

  public connect = async (walletType: string) => {
    try {
      if (walletType === 'METAMASK') {
        this.provider = await detectEthereumProvider()

        if (this.provider?.providers) {
          const { providers } = this.provider
          const metamaskProviderIndex = providers.findIndex(
            (providerItem: any) => providerItem.isMetaMask,
          )
          this.provider.selectedProvider = providers[metamaskProviderIndex]
        }
      } else if (walletType === 'WALLETCONNECT') {
        this.provider = new WalletConnectProvider({
          rpc: {
            [BINANCE_NETWORK.id]: BINANCE_NETWORK.rpcUrl,
            [SMART_CHAIN_TESTNET_NETWORK.id]:
              SMART_CHAIN_TESTNET_NETWORK.rpcUrl,
          },
          chainId: NETWORK_TEST
            ? SMART_CHAIN_TESTNET_NETWORK.id
            : BINANCE_NETWORK.id,
        })
      }

      this.provider.on('chainChanged', () => {
        this.checkNetwork(walletType)
      })
      this.provider.on('disconnect', () => {
        this.disconnect()
      })
      this.provider.on('accountsChanged', async (accounts: any) => {
        if (accounts.length === 0) {
          this.disconnect()
        }

        const web3 = new Web3(this.provider)
        const newAccount = await web3.eth.getAccounts()

        if (newAccount[0] !== this.account) {
          this.account = newAccount[0]
        }
      })

      if (walletType === 'METAMASK') {
        this.provider.request({ method: 'eth_chainId' }).then((res: any) => {
          this.provider
            .request({ method: 'eth_requestAccounts' })
            .then(() => {
              this.checkNetwork(walletType)
            })
            .catch(() => {
              this.disconnect()
            })
        })
      } else if (walletType === 'WALLETCONNECT') {
        await this.provider.enable()
        this.checkNetwork(walletType)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public checkNetwork = async (walletType: string) => {
    if (this.provider) {
      const web3 = new Web3(this.provider)
      const chainId = await web3.eth.getChainId()

      const networkData = NetworksList.find((el) => el.id === chainId) || null

      if (networkData === null) {
        this.isCorrectNetwork = false
        this.changeNetwork()
      } else {
        this.account = (await web3.eth.getAccounts())[0]
        runInAction(() => {
          this.isConnected = true
        })
        this.isCorrectNetwork = true
        localStorage.setItem('WALLET', walletType)
      }
    }
  }

  public changeNetwork = async () => {
    try {
      await this.provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: NETWORK_TEST
              ? SMART_CHAIN_TESTNET_NETWORK.name
              : BINANCE_NETWORK.name,
            chainId: NETWORK_TEST
              ? SMART_CHAIN_TESTNET_NETWORK.chainId
              : BINANCE_NETWORK.chainId,
            nativeCurrency: {
              name: 'BNB',
              decimals: 18,
              symbol: 'BNB',
            },
            rpcUrls: [
              NETWORK_TEST
                ? SMART_CHAIN_TESTNET_NETWORK.rpcUrl
                : BINANCE_NETWORK.rpcUrl,
            ],
          },
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }

  public disconnect = () => {
    this.isConnected = false
    this.isCorrectNetwork = true
    this.account = ''
    localStorage.removeItem('WALLET')
  }
}

export default new Web3Store()
