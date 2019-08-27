import DashboardView from '@/view/Dashboard'

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
    }],
}

export default config;