import React from 'react'
import config from './config'
import { Route, Switch } from 'react-router-dom'

function Router() {
  /**
   * defaultConfig 代表默认配置
   * 根据路由对象来生成不同的 Route
   */
  const routeData = config.routeConfig

  // 筛选出没有重定向的
  const paths = routeData.filter(function (item) {
    return !item.redirect
  })

  return (
    <Switch>
      {paths &&
        paths.map((item) => {
          // exact 表示精确匹配时，才对组件进行渲染
          return (
            <Route
              path={item.path}
              component={item.component}
              key={item.key}
              exact={true}
            ></Route>
          )
        })}
    </Switch>
  )
}

export default Router
