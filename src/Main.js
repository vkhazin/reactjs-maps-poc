import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Map from "./Map";

class Main extends Component {
  render() {
    return (
        <HashRouter>
          <div className="full">
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark ">
              <a class="navbar-brand" href="#"><h2>Simple SPA</h2></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ">
                  <li class="nav-item">
                    {/* <a class="nav-link" href="#">GoogleMap</a> */}
                    <NavLink to="/Map" className="nav-link">GooglMmap</NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="content">
              <Route path="/" component={Map}/>
            </div>
          </div>
        </HashRouter>
        
    )
  }
}
 
export default Main;