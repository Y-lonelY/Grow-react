import HomepageView from '@/view/Homepage';
import PracticeView from '@/view/Practice'
import ChartBarView from '@/components/ChartBar'

interface routeConfigItem {
    key: number;
    title?: string;
    exact: boolean;
    path: string;
    component: any;
}

interface RouterConfig {
    routeConfig: routeConfigItem[];
}

const config: RouterConfig = {
    routeConfig: [{
        key: 1,
        exact: true,
        path: '/',
        component: HomepageView
    }, {
        key: 2,
        exact: true,
        path: '/practice',
        component: PracticeView
    }],
}

export  default config;