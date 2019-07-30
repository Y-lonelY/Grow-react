import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Row, Col} from "antd";
import DailyView from "./DailyView"

class DashBoard extends Component {
    render() {
        return (
            <div className="dashboard">
                <Row>
                    <Col span={24}>
                        <DailyView></DailyView>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashBoard;