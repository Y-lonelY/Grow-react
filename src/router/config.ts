import HomepageView from '@/view/Homepage'
import { asyncComponent } from './AsyncComponent'

interface RouteConfigItem {
  key: string
  title?: string
  path: string
  component: any
}

interface RouterConfig {
  routeConfig: RouteConfigItem[]
}

const config: RouterConfig = {
  routeConfig: [
    {
      key: 'entry',
      path: '/',
      component: HomepageView,
    },
    {
      key: 'weight',
      path: '/weight',
      component: asyncComponent(() => import('@/view/Weight')),
    },
    {
      key: 'practice',
      path: '/practice',
      component: asyncComponent(() => import('@/view/Practice')),
    },
    {
      key: 'tools',
      path: '/tools',
      component: asyncComponent(() => import('@/view/Tools')),
    },
  ],
}

export default config
