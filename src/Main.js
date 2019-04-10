import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Home from "./Home";
  import GetList from "./GetList";
  import Contact from "./Contact";
  import Map from "./Map";
import axios from 'axios';
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/GetList">Input</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/Map">Googl map</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/GetList" component={GetList}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/Map" component={Map}/>
          </div>
        </div>
        </HashRouter>
        
    );
  }
}
 
export default Main;