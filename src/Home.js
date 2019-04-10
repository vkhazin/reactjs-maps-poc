import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div>
        <h2>ReactJS SPA web application with the least number of artefacts</h2>
        <p>1.Responsive and mobile browser friendl</p>
        <p>2.Maps is to center on the current user geo location</p>
        <p>3.the data is availalbe in Southern Ontario, Canada only</p>
        <p>4.Maps tab is to display geoHash overlay based on geoHash query to the end-point mapping the Avg(value) NOT Sum(count)</p>
        <p>5.User can scroll the map with the overlay information updated automatically</p>
        <p>6.User can zoom in and out with increased/decreased precision of the data plotted on the map</p>
        <p>7.Map dynamically adjusts the data ploted based on the zoom level and the current map center </p> 
      </div>
    );
  }
}
 
export default Home;