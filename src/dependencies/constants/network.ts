export interface INetwork {
  id: number;
  name: string;
  chainId: string;
  rpcUrl: string;
}

export const BINANCE_NETWORK: INetwork = {
  id: 56,
  name: 'Binance',
  chainId: '0x38',
  rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
}

export const SMART_CHAIN_TESTNET_NETWORK: INetwork = {
  id: 97,
  name: 'Smart Chain - Testnet',
  chainId: '0x61',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
}

export const NetworksList: INetwork[] = [
  BINANCE_NETWORK,
  SMART_CHAIN_TESTNET_NETWORK,
]
