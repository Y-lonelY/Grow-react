import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import Clock from '../components/clock/index';
import DashBoard from "./dashboard/DashBoardIndex";
import "./style/mainView.scss";

const {
    Header, Footer, Sider, Content
} = Layout;

class Home extends Component {
    render() {
        return (
            <div className="homeBox">
                <Layout className="home-con">
                    <Sider className="hm-con-sdr">
                        <div className="logo-box">logo</div>
                        <Menu theme="light" mode="inline">
                            <Menu.Item key="0">
                                <Icon type="user"></Icon>
                                <span className="nav-text">user</span>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Icon type="video-camera"></Icon>
                                <span className="nav-text">video-camera</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="hm-con-dash">
                        <Header className="dash-header">
                            <Row type="flex" justify="start">
                                <Col offset={18} span={6}>
                                    <Clock />
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                            backgroundColor: '#fff'
                        }}>
                            <DashBoard></DashBoard>
                        </Content>
                        <Footer style={{
                            textAlign: 'center'
                        }}>"hell is other people!"</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Home;