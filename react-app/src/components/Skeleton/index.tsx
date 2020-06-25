import React from 'react'
import Header from './header'
import { SkeletonType } from './types'
import './index.scss'

export default function Skeleton(props: SkeletonType) {
  return (
    <div className="m-skeleton">
      <Header {...props.header} />
      <section className="s-skeleton">
        {props.filter && <div className="filter-panel">{props.filter}</div>}
        {props.children && <div className="main-panel">{props.children}</div>}
      </section>
    </div>
  )
}
