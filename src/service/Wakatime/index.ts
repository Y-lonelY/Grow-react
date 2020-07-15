import { post } from '@/cluster/request'
import moment from 'moment'

const prefix = 'wakatime'

// Query wakatime lists
export const queryWakatimes = (data) => {
  const wakatimes = post(`${prefix}/query`, data)
  console.log(wakatimes)
}