import { get } from '@/cluster/request'
import { headerMockData } from '../mock/header'
import { config } from '@/config/sysConfig'

const useMock = config.useMock === 'false' ? false : true

interface MetadataInterface {
  id: number
  label: string
  type: string
  target: string
  icon?: string
}


export const getHeaderMetadata = async () => {
  const res = useMock ? await headerMockData : []
  return res
}