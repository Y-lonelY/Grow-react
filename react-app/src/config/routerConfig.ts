import DashboardView from '@/view/Exercise'
import ChartBarView from '@/components/ChartBar'

interface routeConfigItem {
    key: number;
    title: string;
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
        title: 'mainView',
        exact: true,
        path: '/',
        component: DashboardView
    }, {
        key: 2,
        title: 'mainView',
        exact: true,
        path: '/test',
        component: ChartBarView
    }],
}

export default config;