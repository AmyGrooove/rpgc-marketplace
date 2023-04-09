import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import '../../theme/styles.scss'

import { QueryClientProvider } from 'react-query'

import NotFound from '../../pages/NotFound'
import AllItems from '../../pages/AllItems'
import { ModalProvider } from '../Modals/ModalProvider/ModalProvider'
import { queryClient } from '../../providers/api'
import ListingItem from '../../pages/ListingItem'
import MyItems from '../../pages/MyItems'
import MedianSalePrice from '../../pages/ListingItem/components/MedianSalePrice'
import Header from '../Header'
import MyTrades from '../../pages/MyTrades'
import Footer from '../Footer'

const App = () => {
  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate replace to="/all-items" />} />
              <Route path="/all-items" element={<AllItems />} />
              <Route path="/item/:listingId" element={<ListingItem />} />
              <Route path="/my-items" element={<MyItems />} />
              <Route
                path="/item/:listingId/median"
                element={<MedianSalePrice />}
              />
              <Route path="/my-trades" element={<MyTrades />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </ModalProvider>
  )
}

export default App
