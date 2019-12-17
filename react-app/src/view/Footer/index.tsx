import React from 'react';
import { Layout, Col, Row, Switch, Icon, Divider, Button } from 'antd';
import { LocaleContext } from '@/cluster/context';
import { config, setUseMock } from '@/config/sysConfig';
import './index.scss';

const { Footer } = Layout;

class FlowFooter extends React.PureComponent {

    static contextType = LocaleContext;

    render() {
        const assets = this.context.assets;
        return (
            <Footer className='flow-footer'>
                <Divider className="footer-seprator">Respect everything that happens</Divider>
                <Row className='main-footer' type='flex' justify='start'>
                    <Col span={18}>
                    </Col>
                    <Col span={2}>
                        <Button type='default' size='small'>About</Button>
                    </Col>
                    <Col span={4}>
                        <Switch
                            size='small'
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            checked={config.useMock === 'true' ? true : false}
                            onChange={this.switchChange}
                        ></Switch>
                        <span className='footer-switch-label'> - {assets.mock}</span>
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