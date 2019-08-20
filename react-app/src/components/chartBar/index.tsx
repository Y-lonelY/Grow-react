import React from "react";
import { Row, Col } from "antd";
import './index.scss';

// create interface to adapt props
interface Props {
    title: string;
}

// 利用接口对传递参数进行检查
class ChartBar extends React.Component<Props> {

    public render() {
        const title = this.props.title && this.props.title !== '' ? this.props.title : ''

        return(
            <div className="chartBar">
                <Row>
                    <Col className='charBarTitle' span={6}>{title}</Col>
                </Row>
            </div>
        )
    }
}

export default ChartBar;