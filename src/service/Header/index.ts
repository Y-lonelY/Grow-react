import { get } from '@/cluster/request'

const prefix = "/grow"

// Get all module list
export const getModules = async (params = null) => {
  return await get(`${prefix}/module`, { params })
}