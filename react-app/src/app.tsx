import React from 'react';
import { Layout, Row, Col } from 'antd';
import { BrowserRouter } from "react-router-dom";
import config from '@/config/routerConfig';
import Router from '@/cluster/Router';
import Clock from '@/components/Clock';
import '@/app.scss';


const {
    Header, Footer, Content
} = Layout;

class App extends React.Component {
    public render() {
        return (
            <div className="homeBox">
                <Layout className="home-con">
                    <Header className="dash-header">
                        <Row type="flex" justify="start">
                            <Col offset={18} span={6}>
                                <Clock />
                            </Col>
                        </Row>
                    </Header>
                    <Content className='dash-content'>
                        {/* 路由主体 */}
                        <BrowserRouter>
                            <Router defaultConfig={config.routeConfig}></Router>
                        </BrowserRouter>
                        {/* 路由主体 */}
                    </Content>
                    <Footer>"hell is other people!"</Footer>
                </Layout>
            </div>
        )
    }
}

export default App;
