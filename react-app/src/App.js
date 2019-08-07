import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { hot } from 'react-hot-loader/root';
import config from './config/routerConfig';
import Router from './cluster/Router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Router defaultConfig={ config.routeConfig }></Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default hot(App);
