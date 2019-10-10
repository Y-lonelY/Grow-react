import React from "react";
import { Row, Col, Switch, Icon, DatePicker, Button, Popover } from "antd";
import AddListFormInstance from './AddListForm';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import './index.scss';

// create interface to adapt props
interface ChartBarProps {
    title: string;
    tableSwitch?: boolean;
    switchChange?: (boolean) => void;
    datePicker?: boolean;
    defaultDateRange?: [moment.Moment, moment.Moment];
    rangeDateChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => void
}

interface ChartBarState {
    popoverShow: boolean
}

const { RangePicker } = DatePicker;

// add popover dialog
function generatePopoverDialog() {
    return(<div>
        111
    </div>);
}

// 利用接口对传递参数进行检查
class ChartBar extends React.Component<ChartBarProps, ChartBarState> {

    constructor(props) {
        super(props);
        this.state = {
            popoverShow: false
        }
    }

    public render() {
        const title = this.props.title && this.props.title.trim() !== '' ? this.props.title : ''

        return (
            <div className="chartBar">
                <Row>
                    <Col className='charBarTitle' span={6}>{title}</Col>
                    <Col className='chartBarBox' span={18}>
                        {/* 添加记录按钮 */}
                        <Popover
                            trigger="click"
                            placement="bottom"
                            content={<AddListFormInstance submit={this.addSubmit}/>}
                            visible={this.state.popoverShow}
                            onVisibleChange={this.handlePopoverShow}>
                            <Button
                                className={`addRecordBtn ${this.state.popoverShow ? "rotate" : ""}`}
                                shape="circle"
                                icon="plus"
                                size="small"
                                type="default" />
                        </Popover>
                        
                        {/* 时间范围选择 */}
                        {this.props.datePicker &&
                            <RangePicker
                                className = 'rangePiacker'
                                defaultValue = {this.props.defaultDateRange}
                                ranges={{
                                    '今天': [moment(), moment()],
                                    '当月': [moment().startOf('month'), moment().endOf('month')]
                                }}
                                locale={locale}
                                size='small'
                                allowClear={false}
                                onChange={this.props.rangeDateChange}
                            />
                        }
                        {/* 图表切换 */}
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

    addSubmit = (date, leg, belly, chest) => {
        console.log(date, leg, belly, chest);
        this.setState({
            popoverShow: false
        });
    }

    handlePopoverShow = (visible) => {
        this.setState({
            popoverShow: visible
        });
    }
}

export default ChartBar;