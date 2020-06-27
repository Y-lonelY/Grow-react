import { ReactNode } from 'react'

export interface ResultType {
  title: ReactNode;
  subTitle?: ReactNode;
  status?: string;
  icon?: string | ReactNode;
  extra?: ReactNode
}
