import { ReactNode } from 'react'
import { IconType } from '@/components/SupIcon/types'

export interface HeaderType {
  icon: IconType
  label: string
  subLabel?: string
  children?: any
}

export interface SkeletonType {
  header: HeaderType
  filter?: ReactNode
  children?: any
}