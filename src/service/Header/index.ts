import { get } from '@/cluster/request'

// Get all module list
export const getModules = async (params = null) => {
  return await get('/module', { params })
}