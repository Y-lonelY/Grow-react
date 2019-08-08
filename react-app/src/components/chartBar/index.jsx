import React from "react";
import { Row, Col } from "antd";
import './index.scss'

class ChartBar extends React.Component {

    render() {
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