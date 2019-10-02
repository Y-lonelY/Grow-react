import React from 'react';
import { Popover, Progress } from 'antd';
import moment from 'moment';
import './index.scss'

interface ClockState {
    date: String
}

class Clock extends React.Component<{}, ClockState> {
    timeInterval: number;
    // 添加一个类构造函数来初始化状态 this.state
    // 类组件应该始终使用 props 调用基础构造函数，super() 方法就是为达到此目的
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('YYYY-MM-DD H:m:ss A'),
        };
    }

    componentDidMount() {
        // 新建一个定时器任务
        this.timeInterval = window.setInterval(() => {
            this.setState({
                date: moment().format('YYYY-MM-DD HH:mm:ss A'),
            });
        }, 1000);
    }

    componentWillUnmount() {
        // 清除定时器任务
        clearInterval(this.timeInterval);
    }

    timeFlow = () => {
        const endDate = moment().endOf("year").format("MM-DD, YYYY");
        const days = moment().dayOfYear();
        const isLeap = moment().isLeapYear();
        let fullDays = 365;

        if (isLeap) {
            fullDays = 366;
        }

        let leftDays = fullDays - days;
        let percent = Number((days * 100 / fullDays).toFixed(0));
        let mockList: string[] = ['react', 'redux', 'python api'];

        return (
            <div className="dateBox">
                <p className="title-bold">{ endDate }</p>
                <p>{ leftDays } days left</p>
                <Progress
                className="date-progress"
                type="line"
                percent={ percent }
                status="active"
                strokeColor={{
                    from: '#eee',
                    to: '#777'
                }}></Progress>
                <p className="title-bold">todo list</p>
                {mockList.map((item, index) => {
                    return (<p key={ String(index) }>{ item }</p>);
                })}
            </div>
        ) 
    }

    render() {
        return (
            <div className="clockBox">
            <Popover
            trigger="hover"
            title="Time Flow"
            content={ this.timeFlow() }>
                <span className="clock-btn">
                { this.state.date }
                </span>
            </Popover>
            </div>
        );
    }
}

export default Clock;