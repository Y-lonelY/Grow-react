import React from "react";
import { Row, Col, Switch, Icon } from "antd";
import './index.scss';

// create interface to adapt props
interface ChartBarProps {
    title: string;
    tableSwitch?: boolean;
    switchChange?: (boolean) => void;
}

// 利用接口对传递参数进行检查
class ChartBar extends React.Component<ChartBarProps> {

    public render() {
        const title = this.props.title && this.props.title.trim() !== '' ? this.props.title : ''

        return(
            <div className="chartBar">
                <Row>
                    <Col className='charBarTitle' span={6}>{title}</Col>
                    <Col className='chartBarBox' span={18}>
                        {this.props.tableSwitch &&
                            <Switch
                                checkedChildren={<Icon type="line-chart" />}
                                unCheckedChildren={<Icon type="table" />}
                                onChange={this.props.switchChange}
                                defaultChecked
                            />
                        }
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ChartBar;