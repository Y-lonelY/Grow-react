import DashboardView from '@/view/Exercise'
import ChartBarView from '@/components/ChartBar'

interface routeConfig {
    key: number;
    title: string;
    exact: boolean;
    path: string;
    component: any;
}

interface Config {
    routeConfig: routeConfig[];
}

const config: Config = {
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