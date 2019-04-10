import React from "react"
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from 'axios';
// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: 43.85275773228681, lng: -79.48056226373973 }}
//   >

//     {props.isMarkerShown && <Marker position={{ lat:43.85275773228681, lng: -79.48056226373973 }} onClick={props.onMarkerClick} />}
//   </GoogleMap>
// )

// class Map extends React.PureComponent {
//   state = {
//     isMarkerShown: true,
//   }

//   componentDidMount() {
//     this.delayedShowMarker()
//   }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }

//   render() {
//     return (
//       <MyMapComponent
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//       />
//     )
//   }
// }
// export default Map;
import fetch   from "isomorphic-fetch";

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat:43.85275773228681, lng: -79.48056226373973 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.count}
          position={{ lat:  43.85275773228681, lng: -79.48056226373973}}
          // position={{ lat: marker.latitude, lng: marker.longitude }}
          
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class Map extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    // const url = [
    //   // Length issue
    //   `https://gist.githubusercontent.com`,
    //   `/farrrr/dfda7dd7fccfec5474d3`,
    //   `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    // ].join("")

    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data.photos);
    //     this.setState({ markers: data.photos });
    //   });
    axios.post(`https://gsqztydwpe.execute-api.us-east-1.amazonaws.com/latest/geoHash`, 
    {
      "timestampMs": {
        "from": 1239065720835,
        "to": 1870217733565
      },
      "boundary": {
        "topLeft": {
          "lat": 44.56657,
          "lon": -81.916815
        },
        "bottomRight": {
          "lat": 42.697970000000005,
          "lon": -77.137755          
        }
      },
      "precision": 5,
      "timeoutMs": 30000
    })

      .then(res => {
        console.log(res.data);
        this.setState({markers:res.data})
        
      })
  }
  

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}
export default Map;