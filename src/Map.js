import React from "react"
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from 'axios';
import { MarkerClusterer }  from "react-google-maps/lib/components/addons/MarkerClusterer";

var lata=43.8527577322868;
var lnga=-79.48056226373973;
//_______________________________________  2.Maps is to center on the current user geo location ___
navigator.geolocation.getCurrentPosition(
  position => {
    lata= position.coords.latitude; 
    lnga=position.coords.longitude;
  }, 
  error => console.log(error)
);

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key&v=3.exp&libraries=geometry,drawing,places",
     loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='hhh' />,
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
    gestureHandling='none'
    fullscreenControl={true}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={20}
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
      "precision": 12,
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