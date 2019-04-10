import React from "react"
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from 'axios';

var lata=43.8527577322868;
var lnga=-79.48056226373973;
//_______________________________________  2.Maps is to center on the current user geo location ___
// navigator.geolocation.getCurrentPosition(
//   position => {
//     lata= position.coords.latitude; 
//     lnga=position.coords.longitude;
//   },
//   error => console.log(error)
// );
var screenHeight='550px';
 screenHeight=window.innerHeight-60 +'px';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key&v=3.exp&libraries=geometry,drawing,places",
     loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: screenHeight}} />,
    // containerElement: <div className="full" />,
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
    defaultZoom={11}
    defaultCenter={{ lat: lata, lng: lnga }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.geoPoint}
          position={{ lat:  marker.location['lat'], lng: marker.location['lon']}} 
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class Map extends React.PureComponent {
  componentWillMount() {
    this.setState({ 
      markers: [] ,
      lat:43.85275773228681,
      lng:-79.48056226373973
    })
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
        console.log("kkk"+window.innerHeight);
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