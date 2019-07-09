import React, {Component} from "react"
import { compose, withProps, withState, withHandlers }  from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow , Circle } from "react-google-maps"
import axios from 'axios';

var image= {
  high: {url: require('./asset/1.png')},
  medium:{url: require('./asset/2.png')},
  low:{url: require('./asset/3.png')}

}

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

const MapWithControlledZoom = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key&v=3.exp&libraries=geometry,drawing,places",
     loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='hhh' />,
    mapElement: <div style={{ height: `100%` }} />,
    
  }),
  withState('zoom', 'onZoomChange', 8),
  withScriptjs,
  withGoogleMap
)(props =>
  
  <GoogleMap
    defaultCenter={{lat: lata, lng: lnga }}
    zoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
    onDragEnd={props.onCenterChanged}    
  >

    {props.markers.map(marker => (
        <Marker
          key={marker.geoPoint}
          icon={image[marker.valueRange]}
          position={{ lat:  marker.location.lat, lng: marker.location.lon}} 
        />   
      ))}
  </GoogleMap>
);


class Map extends React.PureComponent {
  componentWillMount() {
    this.setState({ 
      markers: [] ,
      lat:43.85275773228681,
      lng:-79.48056226373973,
      precision:3,
      boundTopLeftLat:44.56657,
      boundTopLeftLng:-81.916815,
      boundBottomRightLat:42.697970000000005, 
      boundBottomRightLng:-77.137755
    })
  }
  handleMapMounted = this.handleMapMounted.bind(this);
  handleCenterChanged = this.handleCenterChanged.bind(this);
  handleMapMounted(map) {
    this._map = map;
  }

  onZoomChanged(){
    console.log("changed")
  }
  getDataAPI(precision,boundTopLeftLat,boundTopLeftLng,boundBottomRightLat, boundBottomRightLng){
    axios.post(`https://gsqztydwpe.execute-api.us-east-1.amazonaws.com/latest/geoHash`, //send request
    {
      "timestampMs": {
        "from": 1239065720835,
        "to": 1870217733565
      },
      "boundary": {
        "topLeft": {
          "lat": boundTopLeftLat,//44.56657,
          "lon": boundTopLeftLng,//-81.916815
        },
        "bottomRight": {
          "lat": boundBottomRightLat,//42.697970000000005,
          "lon": boundBottomRightLng,//-77.137755          
        }
      },
      "precision": precision,
      "timeoutMs": 30000,
      "deviceId": "157929A2-3843-4F55-88FD-00EB3171ECE5",
      "connectionType": "cellular",
      "provider": "Rogers Wireless",
      "filterByProvider": false,
      "filterByDeviceId": true,
      "latencyRanges": {
        "good": 150,
        "poor": 250
      }                             
    })

      .then(res => {  //response
        console.log("respoons"+ res.data.latency);
        this.setState({markers:res.data.latency});
        
      })
    
  }
  componentDidMount() {
    this.getDataAPI(this.state.precision,this.state.boundTopLeftLat,this.state.boundTopLeftLng,this.state.boundBottomRightLat,this.state.boundBottomRightLng)
    console.log("did mounted")

  }
  handleCenterChanged() {
   const nextCenterLat = this._map.getCenter().lat();
   const nextCenterLng = this._map.getCenter().lng();

   var boundTopLeftLat  =this._map.getBounds().getNorthEast().lat();   
   var boundTopLeftLng  = this._map.getBounds().getSouthWest().lng(); 
   var boundBottomRightLat=this._map.getBounds().getSouthWest().lat();
   var boundBottomRightLng= this._map.getBounds().getNorthEast().lng();

   if(boundTopLeftLat>44.56657)  boundTopLeftLat=44.56657;
   else if(boundTopLeftLat<42.697970000000005)  boundTopLeftLat=42.697970000000005;
   if(boundTopLeftLng<-81.916815)  boundTopLeftLng=-81.916815;
   else if(boundTopLeftLng>-77.137755)  boundTopLeftLng=-77.137755;

   if(boundBottomRightLat>44.56657)  boundBottomRightLat=44.56657;
   else if(boundBottomRightLat<42.697970000000005)  boundBottomRightLat=42.697970000000005;
   if(boundBottomRightLng<-81.916815)  boundBottomRightLng=-81.916815;
   else if(boundBottomRightLng>-77.137755)  boundBottomRightLng=-77.137755;

   this.setState({boundTopLeftLat: boundTopLeftLat})
   this.setState({boundTopLeftLng: boundTopLeftLng})
   this.setState({boundBottomRightLat: boundBottomRightLat})
   this.setState({boundBottomRightLng: boundBottomRightLng})

   const currentZoomLebel=this._map.getZoom();
   if(currentZoomLebel<9) this.setState({precision:3})
   else if(currentZoomLebel>19) this.setState({precision:12})
   else this.setState({precision: (currentZoomLebel)-6})

   this.getDataAPI(this.state.precision,this.state.boundTopLeftLat,this.state.boundTopLeftLng,this.state.boundBottomRightLat,this.state.boundBottomRightLng)
  //  console.log("bound0:", boundTopLeftLat, boundTopLeftLng, boundBottomRightLat, boundBottomRightLng)
  //  console.log("bound_s:",this.state.boundTopLeftLat,this.state.boundTopLeftLng,this.state.boundBottomRightLat,this.state.boundBottomRightLng)
  //  console.log(currentZoomLebel)
  //  console.log(nextCenterLat, nextCenterLng)
  //  console.log(this.state.precision)
  }

  render() {
    console.log("Lendered")
    return (
      <MapWithControlledZoom 
        markers={this.state.markers}
        onMapMounted={this.handleMapMounted}
        onCenterChanged={this.handleCenterChanged}
        onDragEnd={this.handleCenterChanged}
        onZoomChanged={this.handleCenterChanged}
      />
    )
  }
}
export default Map;


