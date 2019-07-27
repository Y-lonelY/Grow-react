import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import Clock from '../components/clock/index';
import '../style/view/home.scss';

const {
    Header, Footer, Sider, Content
} = Layout;

// 数据源
const data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' }
};

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
                            <div><Chart width={600} height={400} data={data} scale={cols}>
                                <Axis name="genre" title />
                                <Axis name="sold" title />
                                <Legend position="top" dy={-20} />
                                <Tooltip />
                                <Geom type="interval" position="genre*sold" color="genre" />
                            </Chart></div>
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