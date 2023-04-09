import * as React from 'react'

import { MarketplaceStore } from '../stores'

type Props = {
  children: React.ReactNode;
};

// export const Context = React.createContext<MarketplaceStore>(
//   new MarketplaceStore(),
// )

// export function useMarketplaceStore(): MarketplaceStore {
//   return React.useContext(Context)
// }

// export function MarketplaceStoreProvider({ children }: Props): JSX.Element {
//   const store = React.useMemo(() => new MarketplaceStore(), [])
//   // React.useEffect(() => {
//   //   (async () => {
//   //     try {
//   //     }
//   //     catch (e) {}
//   //   })()
//   // }, [])
//   return <Context.Provider value={store}>{children}</Context.Provider>
// }
