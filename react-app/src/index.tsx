import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from '@/store/store';
import * as serviceWorker from '@/serviceWorker';
import App from '@/app';
import '@/index.css';

// moment 设置全局 local
moment.locale('zh-cn');

// set hot load module
hot(App)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
