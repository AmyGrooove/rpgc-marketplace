import axios from 'axios'
import { QueryClient } from 'react-query'

const apiClient = axios.create({
  // baseURL: 'http://38.242.212.99:3020/api/v1',
  baseURL: 'https://api-rpgc.ibisweb3.dev/api/v1',
})

const queryClient = new QueryClient()

export { apiClient, queryClient }
