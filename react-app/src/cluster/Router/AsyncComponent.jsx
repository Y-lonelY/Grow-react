import React from 'react';

export function asyncComponent(getTargetComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        componentDidMount() {
            getTargetComponent().then(md => {
                this.setState({
                    // 同时兼容 ES6 和 CommonJS 的模块
                    component: md.default ? md.default : md
                });
            })
        }

        render() {
            const Target = this.state.component;
            // 通过自闭和标签进行返回，是为了接受可能出现的 props 参数传递
            return Target ? <Target {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}