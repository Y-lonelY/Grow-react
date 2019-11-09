import React from 'react';

class FocusView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'show',
        };
    }

    render() {
        return (
            <div className='focusView'>
                <div className='focus-empty'>添加一个 Focus，你知道的，专注一种品质！</div>
            </div>
        );
    }

    // 初始化阶段，render() 完成之后
    componentDidMount() {
        this.initData();
    }

    initData = () => {

    }
}

export default FocusView;