import HomepageView from '@/view/Homepage';
import PracticeView from '@/view/Practice';
import { asyncComponent } from './AsyncComponent';

interface routeConfigItem {
    key: number;
    title?: string;
    path: string;
    component: any;
}

interface RouterConfig {
    routeConfig: routeConfigItem[];
}

const config: RouterConfig = {
    routeConfig: [{
        key: 1,
        path: '/',
        component: HomepageView
    }, {
        key: 2,
        path: '/practice',
        component: asyncComponent(() => import ('@/view/Practice'))
    }],
}

export  default config;