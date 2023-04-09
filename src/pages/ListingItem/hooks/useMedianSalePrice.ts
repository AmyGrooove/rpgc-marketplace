import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Tick,
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
  ScriptableContext,
} from 'chart.js'
import { _DeepPartialObject } from 'chart.js/types/utils'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { apiClient } from '../../../providers/api'
import { MONTHS, WEEKS_DAY } from '../../../theme/sources'

import { graphFilterParam } from './useGraphFilter'

const useMedianSalePrice = () => {
  const [backData, setBackData] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
  ])

  const [search, setSearch] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    apiClient
      .get('/history/price/dynamics', {
        params: {
          itemId: location.pathname
            .replace('/median', '')
            .replace('/item/', ''),
          dateFilter: search.get(graphFilterParam) || 'all_time',
        },
      })
      .then((response) => {
        if (response.data.length !== 0) {
          setBackData(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [search])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
  )

  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div')

    if (!tooltipEl) {
      tooltipEl = document.createElement('div')
      tooltipEl.className = 'custom-median-tooltip'

      const value = document.createElement('div')
      const date = document.createElement('div')
      value.id = 'median-value'
      date.id = 'median-date'

      tooltipEl.appendChild(value)
      tooltipEl.appendChild(date)
      chart.canvas.parentNode.appendChild(tooltipEl)
    }

    return tooltipEl
  }

  const externalTooltipHandler = (context: any) => {
    const { chart, tooltip } = context
    const tooltipEl = getOrCreateTooltip(chart)

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      return
    }

    const value = tooltipEl.querySelector('#median-value')
    const date = tooltipEl.querySelector('#median-date')
    value.innerHTML =
      Number(tooltip.dataPoints[0].formattedValue).toFixed(4) + ' RPGC'
    date.innerHTML = new Date(
      Number(tooltip.dataPoints[0].label.replaceAll(' ', '')),
    ).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

    tooltipEl.style.opacity = 1
    tooltipEl.style.left = positionX + tooltip.caretX + 'px'
    tooltipEl.style.top = positionY + tooltip.caretY + 'px'
    tooltipEl.style.font = tooltip.options.bodyFont.string
    tooltipEl.style.padding =
      tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
  }

  const getGradient = (context: ScriptableContext<'scatter'>) => {
    const chart = context.chart
    const { ctx, chartArea } = chart

    if (!chartArea) {
      return
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 320)
    gradient.addColorStop(0, 'rgba(208, 184, 56, 0.4)')
    gradient.addColorStop(1, 'rgba(27, 23, 38, 0.2)')

    return gradient
  }

  const data: ChartData<'scatter'> = {
    datasets: [
      {
        data: backData,
      },
    ],
  }

  let lastItem = ''

  const getLabel = (value: string | number, index: number, values: Tick[]) => {
    switch (search.get(graphFilterParam)) {
    case 'week': {
      const label = new Date(value).getDay()
      if (label.toString() !== lastItem) {
        lastItem = label.toString()
        return WEEKS_DAY[label]
      }
      break
    }
    case 'month': {
      const label = new Date(value).getDate()
      if (label.toString() !== lastItem) {
        lastItem = label.toString()
        return label
      }
      break
    }
    case 'year': {
      const label = new Date(value).getMonth()
      if (label.toString() !== lastItem) {
        lastItem = label.toString()
        return MONTHS[label]
      }
      break
    }
    default: {
      const label =
          new Date(value).getDate() + ' ' + MONTHS[new Date(value).getMonth()]
      if (label.toString() !== lastItem) {
        lastItem = label.toString()
        return label
      }
      break
    }
    }
  }

  const options:
    | _DeepPartialObject<
        CoreChartOptions<'scatter'> &
          ElementChartOptions<'scatter'> &
          PluginChartOptions<'scatter'> &
          DatasetChartOptions<'scatter'> &
          ScaleChartOptions<'scatter'> &
          LineControllerChartOptions
      >
    | undefined = {
      showLine: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          min: backData[0].x - 10000000,
          max: backData[backData.length - 1].x + 10000000,
          ticks: {
            padding: 30,
            callback: (value: string | number, index: number, values: Tick[]) =>
              getLabel(value, index, values),
          },
          grid: {
            color: 'transparent',
            borderColor: '#332D43',
          },
        },
        y: {
          ticks: {
            stepSize: 50,
            padding: 30,
          },
          grid: {
            color: '#332D43',
            borderColor: 'transparent',
          },
        },
      },
      elements: {
        point: {
          backgroundColor: 'rgba(27,23,38,1)',
          borderColor: 'rgba(255,222,45,1)',
          radius: 6,
          borderWidth: 3,
          hoverBorderWidth: 3,
          hoverRadius: 6,
        },
        line: {
          fill: true,
          tension: 0.4,
          backgroundColor: getGradient,
          borderColor: 'rgba(255,222,45,1)',
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandler,
        },
      },
    }

  return { options, data }
}

export default useMedianSalePrice
