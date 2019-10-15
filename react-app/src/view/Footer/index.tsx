import React from 'react';
import { Layout, Col, Row, Switch, Icon, Divider} from 'antd';
import { config, setUseMock } from '@/config/sysConfig';
import './index.scss';

const { Footer } = Layout;

class FlowFooter extends React.Component {
    render() {
        return (
            <Footer className='flow-footer'>
                <Divider className="footer-seprator">Respect everything that happens</Divider>
                <Row className='main-footer' type='flex' justify='start'>
                    <Col span={20}></Col>
                    <Col span={4}>
                        <Switch
                            size='small'
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            checked={config.useMock === 'true' ? true : false}
                            onChange={this.switchChange}
                            ></Switch>
                            <span className='footer-switch-label'> - 使用虚拟数据</span>
                    </Col>
                </Row>
            </Footer>
        );
    };

    componentDidMount() {

    }

    switchChange = (checked, event) => {
        setUseMock(checked);
    }
}

export default FlowFooter;