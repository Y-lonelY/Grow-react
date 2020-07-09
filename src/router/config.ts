import { asyncComponent } from './AsyncComponent'

interface RouteConfigItem {
  key: string;
  title?: string;
  path: string;
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
      component: asyncComponent(() => import('@/view/Weight')),
    },
    {
      key: 'weight',
      path: '/weight',
      component: asyncComponent(() => import('@/view/Weight')),
    },
    {
      key: 'wakatime',
      path: '/wakatime',
      component: asyncComponent(() => import('@/view/Wakatime'))
    }
  ],
}

export default config
