import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import RouteConfig from './cluster/RouteConfig';
import Router from './cluster/Router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Router defaultConfig={ RouteConfig }></Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
