import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import store from '@/store/store';
import { Theme } from '@/config/bizchartTheme';
import * as serviceWorker from '@/serviceWorker';
import '@/index.css';
// @ts-ignore
import { setTheme } from 'bizcharts';

// bizchart 设置主题，保持图的颜色一致，在 typescript 下引入出现问题，因此在引入该模块时，需要忽略 typescript 检查
setTheme(Theme)

// set hot load module
hot(App)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
