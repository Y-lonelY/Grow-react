import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { hot } from 'react-hot-loader/root';
import store from './store/store';
import config from './config/routerConfig';
import Router from './cluster/Router';
import * as serviceWorker from './serviceWorker';
import './index.css';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
