import React from "react";
import { Row, Col, Switch, Icon, DatePicker } from "antd";
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

const { RangePicker } = DatePicker;

// 利用接口对传递参数进行检查
class ChartBar extends React.Component<ChartBarProps> {

    public render() {
        const title = this.props.title && this.props.title.trim() !== '' ? this.props.title : ''

        return (
            <div className="chartBar">
                <Row>
                    <Col className='charBarTitle' span={6}>{title}</Col>
                    <Col className='chartBarBox' span={18}>
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
}

export default ChartBar;