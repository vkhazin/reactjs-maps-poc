import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Mapheat from "./Mapheat";

class Main extends Component {
  
  render() {
    return ( 
        <Router>
        <div className="full">

            <Route path="/" component={Mapheat} />
       
        </div>
    </Router>
        
    )
  }
}
 
export default Main;
