import React, { Component } from "react";
// import {
//     Route,
//     NavLink,
//     HashRouter
//   } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {RouteComponentProps, withRouter} from "react-router";

  import MapContainer from "./MapMarker";
  import MapContainer2 from "./Map2";
  import MapCluster from "./MapCluster";
  import Mapheat from "./Mapheat";
  // import { parse } from 'query-string';
 
  function test() {
    // console.log(this.props.location.search);
    return <h2>Test</h2>;
  }

class Main extends Component {
  
  render() {
    return ( 
        // <HashRouter>
        //   <div className="full">
        //     <nav class="navbar navbar-expand-sm navbar-dark bg-dark ">
        //       <a class="navbar-brand" href=""><h2>Simple SPA</h2></a>
        //       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //         <span class="navbar-toggler-icon"></span>
        //       </button>
        //       <div class="collapse navbar-collapse" id="navbarNav">
        //         <ul class="navbar-nav ">
        //           <li class="nav-item">
        //             {/* <a class="nav-link" href="#">GoogleMap</a> */}
        //             <NavLink to="/Map" className="nav-link">GooglMmap</NavLink>
        //           </li>
        //           <li class="nav-item">
        //             {/* <a class="nav-link" href="#">GoogleMap</a> */}
        //             <NavLink to="/Map2" className="nav-link">GooglMmap2</NavLink>
        //           </li>
        //         </ul>
        //       </div>
        //     </nav>
        //     <div className="content">
        //       <Route path="/Map" component={MapContainer}/>
        //       <Route path="/Map2" component={MapContainer2}/>
        //     </div>
        //   </div>
        // </HashRouter>

        <Router>
        <div className="full">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
          <Link to="/" className="navbar-brand"><h2>Simple SPA</h2></Link>
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <Link to="/" className="nav-link">GoogleMap</Link>
                </li>
                <li class="nav-item">
                  <Link to="/heatmap" className="nav-link">Google-HeatMap</Link>
                </li>
                <li class="nav-item">
                  <Link to="/test" className="nav-link">test</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="content">
            <Route path="/" exact component={MapContainer2} />
            <Route path="/test" exact component={test} />
            <Route path="/heatmap" component={Mapheat} />
          </div>
        </div>
    </Router>
        
    )
  }
}
 
export default Main;
