import { get, post, patch, del } from '@/cluster/request'

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
