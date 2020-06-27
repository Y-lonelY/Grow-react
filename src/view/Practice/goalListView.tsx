import React from 'react';
import { Collapse, Icon, Col, Row, Progress, Statistic, Button } from 'antd';
import { SuperEmpty, SuperIcon } from '@/components/Override';
import { connect } from 'react-redux';
import { changeGoalList } from '@/store/Exercise/action';
import { getGoalList } from '@/service/practice/service';
import { GoalListProps } from '@/index.d.ts';
import moment from 'moment';

const { Panel } = Collapse;

interface GoalListState {
    expandIndex: string
}

/**
 * 业务和业务耦合，复用性较低，所以放在 view layer
 */
class GoalListView extends React.PureComponent<GoalListProps, GoalListState> {
    constructor(props) {
        super(props);
        this.state = {
            expandIndex: '0'
        }
    }
    render() {
        // 渲染左侧边栏
        const panelList = this.props.goalListData.map((item, index) => {
            const hasAchived = Number(item.summary) < Number(item.goal) ? false : true;
            const percent = Math.round(Number(item.summary) / Number(item.goal) * 100);
            return (
                <Panel
                    className={`goal-item ${hasAchived ? 'isOff' : 'isOn'} ${String(index) === this.state.expandIndex ? 'active' : 'ow'}`}
                    key={String(index)}
                    header={item.reward}>

                    <Row className='progeress'>
                        <Col span={4}>
                            <SuperIcon type={`icon-${item.type}`} style={{fontSize: '22px'}} />
                        </Col>
                        <Col className='value' span={20}>
                            <Progress size='small' percent={percent} />
                        </Col>
                    </Row>
                    <Row className='price'>
                        <Col span={12}>
                            <Statistic title='Counts' value={Number(item.summary)} suffix={` / ${item.goal}`} />
                        </Col>
                        <Col className='end' span={12}>
                            <Statistic title='Price(CNY)' value={item.total_price} suffix={<Icon type='¥' />} />
                        </Col>
                    </Row>
                    <Row className='date'>
                        <Col className='label' span={4}>From</Col>
                        <Col className='value' span={20}>{moment(item.start_date).format('YYYY-MM-DD HH:mm:ss')}</Col>
                    </Row>
                    {/* 结束时间 */}
                    {item.end_date &&
                        <Row className='date'>
                            <Col className='label' span={4}>To</Col>
                            <Col className='value' span={20}>{moment(item.end_date).format('YYYY-MM-DD HH:mm:ss')}</Col>
                        </Row>
                    }
                    {/* 评论 */}
                    {item.remark && item.remark.length > 0 &&
                        <p>{item.remark}</p>
                    }
                    {/* 功能行 */}
                    <Row className='funcBox'>
                        {item.start_date && item.end_date &&
                            <Col className='link' span={4} offset={20}>
                                <Button
                                    icon='double-right'
                                    size='small'
                                    onClick={this.updateDate.bind(this, item.start_date, item.end_date)}></Button>
                            </Col>
                        }
                    </Row>
                </Panel>
            );
        });

        return (
            <div className='goalBox'>
                {Array.isArray(this.props.goalListData) && this.props.goalListData.length > 0 ?
                    <Collapse
                        bordered={false}
                        accordion={true}
                        defaultActiveKey={this.state.expandIndex}
                        onChange={this.changeExpand}>
                        {panelList}
                    </Collapse> : <SuperEmpty />
                }
            </div>
        );
    }

    async componentDidMount() {
        const res = await getGoalList();
        if (res.success) {
            this.props.changeGoalList(res.list);
        }
    }

    changeExpand = (value) => {
        const data = value === undefined ? '-1' : String(value);
        this.setState({
            expandIndex: data
        });
    }

    updateDate = (start_date, end_date) => {
        const start = moment(start_date).format('YYYY-MM-DD');
        const end = moment(end_date).format('YYYY-MM-DD');
        this.props.updateDate({ start: start, end: end }, true);
    }
}

function mapStateToProps({ goalListData }) {
    return {
        goalListData,
    }
}

export default connect(mapStateToProps, {
    changeGoalList
})(GoalListView);