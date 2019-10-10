import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from '@/store/store';
import { Theme } from '@/config/bizchartTheme';
import * as serviceWorker from '@/serviceWorker';
import App from '@/app';
import '@/index.css';
// @ts-ignore
import { setTheme } from 'bizcharts';

// bizchart 设置主题，保持图的颜色一致，在 typescript 下引入出现问题，因此在引入该模块时，需要忽略 typescript 检查
setTheme(Theme)

// moment 设置全局 local
moment.locale('zh-cn');

// set hot load module
hot(App)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
