import { Scatter } from 'react-chartjs-2'

import useMedianSalePrice from '../../hooks/useMedianSalePrice'

const MedianBlock = () => {
  const { options, data } = useMedianSalePrice()

  return <Scatter
    height={100} data={data}
    options={options} />
}

export default MedianBlock
