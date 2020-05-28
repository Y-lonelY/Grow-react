import HomepageView from '@/view/Homepage'
import { asyncComponent } from './AsyncComponent'

interface RouteConfigItem {
  key: number
  title?: string
  path: string
  component: any
}

interface RouterConfig {
  routeConfig: RouteConfigItem[]
}

let initId = 1

function generateId() {
  return initId++
}

const config: RouterConfig = {
  routeConfig: [
    {
      key: generateId(),
      path: '/',
      component: HomepageView,
    },
    {
      key: generateId(),
      path: '/practice',
      component: asyncComponent(() => import('@/view/Practice')),
    },
    {
      key: generateId(),
      path: '/tools',
      component: asyncComponent(() => import('@/view/Tools')),
    },
  ],
}

export default config
