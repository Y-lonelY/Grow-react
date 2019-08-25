import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { hot } from 'react-hot-loader/root';
import store from '@/store/store';
import config from './config/routerConfig';
import Router from './cluster/Router';
import * as serviceWorker from '@/serviceWorker';
import '@/index.css';

// declare app components with functional
function App() {
    return (
        <BrowserRouter>
            <Router defaultConfig={config.routeConfig}></Router>
        </BrowserRouter>
    );
}

// set App hot loader
hot(App)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
