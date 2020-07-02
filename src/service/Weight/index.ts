import { get, post, patch, del } from '@/cluster/request'
import moment from 'moment'

const prefix = '/weight'

// Get all users
export const getUsers = async () => {
  const users = await get(`${prefix}/users`)
  if (users && Array.isArray(users)) {
    return users.map(({ value }) => {
      return {
        value,
        label: value,
      }
    })
  }
  return []
}

// Query weight list
export const queryWeights = async (data) => {
  const weights = await post(`${prefix}/query`, data)
  if (weights && weights.length) {
    return weights.map(({ updatedAt, user, weight }) => {
      return {
        date: moment(updatedAt).format('YYYY-MM-DD'),
        user,
        weight
      }
    })
  }
  return []
}

// create a new weight
export const createWeight = async (data) => {
  return await post(`${prefix}/`, data)
}
