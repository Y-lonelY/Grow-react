import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from "react-router-dom";
import routeConfig from '@/config/routerConfig';
import { config as systemConfig } from '@/config/sysConfig';
import Router from '@/cluster/Router';
import FlowHeader from '@/view/Header';
import FlowFooter from '@/view/Footer';
import '@/app.scss';


const {
    Content
} = Layout;

interface appState {
    hasError: boolean
}

class App extends React.Component<{}, appState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    public render() {
        if (this.state.hasError) {
            return (
                <h1>Somethings went wrong.</h1>
            );
        };
        return (
            <BrowserRouter>
            <div className={`homeBox ${systemConfig.hugeScreen ? 'max' : 'mac'}`}>
                <Layout className="home-con">
                    <FlowHeader></FlowHeader>
                    <Content className='dash-content'>
                        {/* 路由主体 */}
                            <Router defaultConfig={routeConfig.routeConfig}></Router>
                        {/* 路由主体 */}
                    </Content>
                    <FlowFooter></FlowFooter>
                </Layout>
            </div>
            </BrowserRouter>
        )
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }
}

export default App;
