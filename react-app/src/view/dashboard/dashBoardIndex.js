import React, {Component} from "react";
import {Row, Col} from "antd";
import DailyView from "./DailyView"

class DashBoard extends Component {
    render() {
        return (
            <div className="dashboard">
                <Row>
                    <Col span={18}>
                        <DailyView></DailyView>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashBoard;