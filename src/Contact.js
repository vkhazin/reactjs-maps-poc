import React, { Component } from "react";
import Geolocation from "react-geolocation"
 
class Contact extends Component {
  render() {
    return (
      <div>
        <h2>GOT QUESTIONS?</h2>
        <p>The easiest thing to do is post on
        our <a href="http://forum.kirupa.com">forums</a>.
        </p>
        <Geolocation
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div>
              <button onClick={getCurrentPosition}>Get Position</button>
              {error &&
                <div>
                  {error.message}
                </div>}
              <pre>
                latitude: {latitude}
                longitude: {longitude}
              </pre>
            </div>}
        />
      </div>
    );
  }
}
 
export default Contact;