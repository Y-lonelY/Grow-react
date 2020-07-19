import { post } from '@/cluster/request'
import moment from 'moment'

const prefix = 'wakatime'

// Query wakatime lists
export const queryWakatimes = async (data) => {
  const wakatimes = await post(`${prefix}/query`, data)
  return wakatimes
}

// Query statistic list
export const queryStatistics = async (data) => {
  const statistics = await post(`${prefix}/statistics`, data)
  return statistics
}