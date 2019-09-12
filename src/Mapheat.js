import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import queryString from 'query-string';
import Config from './Config';
import axios from 'axios';

var lata=43.8527577322868;
var lnga=-79.48056226373973;
const minPrecision = 4;
const maxPrecision = 8;
const maxLatitudeDelta = 1.5;
const logBase = 1.91;
const correctionFactor = 1.4;
// _______________________________________  current user geo location ___
navigator.geolocation.getCurrentPosition(
 position => {
   lata= position.coords.latitude; 
   lnga=position.coords.longitude;
   console.log(lata,lnga);
 }, 
 error => console.log(error)
);

class Mapheat extends Component {

  constructor(props) {
    super(props)
    this.state = {
       heatmapVisible: true,
       heatmapPoints: [
           {lat: 59.95, lng: 30.33},
           {lat: 59.96, lng: 30.32}
         ],
       center: {
         lat: lata,
         lng: lnga
       },
       zoom: 12  ,
       markers: [] ,
       lat:43.85275773228681,
       lng:-79.48056226373973,
       precision:3,
       boundTopLat:44.56657,
       boundTopLng:-81.916815,
       boundBottomLat:42.697970000000005, 
       boundBottomLng:-77.137755,
       deviceId:"157929A2-3843-4F55-88FD-00EB3171ECE5",
       filterByDeviceId:'',
       filterByProvider: false,
       mapTypeId:"roadmap"
    }
  }

  
  _onBoundsChange=(center, zoom, bounds, marginBounds)=> {

   // bound
   var boundTopLat  =bounds[0];
   var boundTopLng  =bounds[1]; 
   var boundBottomLat=bounds[2];
   var boundBottomLng=bounds[3];
   //// if out of Toronto of canada, boundary will be fixed
   // if(boundTopLat>44.56657)  boundTopLat=44.56657;
   // else if(boundTopLat<42.697970000000005)  boundTopLat=42.697970000000005;
   // if(boundTopLng<-81.916815)  boundTopLng=-81.916815;
   // else if(boundTopLng>-77.137755)  boundTopLng=-77.137755;

   // if(boundBottomLat>44.56657)  boundBottomLat=44.56657;
   // else if(boundBottomLat<42.697970000000005)  boundBottomLat=42.697970000000005;
   // if(boundBottomLng<-81.916815)  boundBottomLng=-81.916815;
   // else if(boundBottomLng>-77.137755)  boundBottomLng=-77.137755;

   var latitudeDelta=boundTopLat-boundBottomLat;
   const precision = Math.max(
     minPrecision,
     Math.min(
       ((maxLatitudeDelta - Math.log(latitudeDelta)/Math.log(logBase)) * correctionFactor),
       maxPrecision
     )
   );


   // console.log("boundTopLat: " + boundTopLat);
   // console.log("boundBottomLat: " + boundBottomLat);
   // console.log("latitudeDelta: " + latitudeDelta);
   // console.log("zoom: " + zoom);

   this.getDataAPI(precision,boundTopLat, boundTopLng, boundBottomLat, boundBottomLng);

 }

 getDataAPI(precision,boundTopLat,boundTopLng,boundBottomLat, boundBottomLng){
   axios.post(`https://gsqztydwpe.execute-api.us-east-1.amazonaws.com/latest/geoHash`, //send request
   {
     "timestampMs": {
       "from": 1239065720835,
       "to": 1870217733565
     },
     "boundary": {
       "topLeft": {
         "lat": boundTopLat,//44.56657,
         "lon": boundTopLng,//-81.916815
       },
       "bottomRight": {
         "lat": boundBottomLat,//42.697970000000005,
         "lon": boundBottomLng,//-77.137755
       }
     },
     "precision": precision,
     "timeoutMs": 30000,
     "deviceId": this.state.deviceId,
     "connectionType": "cellular",
     "provider": "Rogers Wireless",
     "filterByProvider": this.state.filterByProvider,
     "filterByDeviceId": this.state.filterByDeviceId,
     "latencyRanges": {
       "good": 150,
       "poor": 250
     }                             
   })
     .then(res => {  //response
       // this.setState({markers:res.data.latency});
       var kkk=[];
       res.data.latency.forEach(element => {
         kkk.push({lat:element.location.lat, lng:element.location.lon});

       });
 
       this.setState({heatmapPoints:kkk});
       
     })
   
 }
 getMapOptions = (maps) => {

   let params = queryString.parse(this.props.location.search);
    
    let canScroll = true;
    if(params.fixView === "true")
    {
     canScroll = false;
    }
//     console.log(canScroll);
    
   return {
       mapTypeControl: true,
       mapTypeId: maps.MapTypeId.ROADMAP,
       mapTypeControlOptions: {
           style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
           position: maps.ControlPosition.TOP_LEFT,
           mapTypeIds: [
               maps.MapTypeId.ROADMAP,
               maps.MapTypeId.SATELLITE
           ]
       },
       draggable: canScroll,
       zoomControl: canScroll,
   };
 }
 componentDidMount(){
   // console.log(this.props.match.params);
   let url = this.props.location.search;
   let params = queryString.parse(url);
   
   if(params.topLat && params.topLon && params.botLat && params.botLon){
     // console.log(params.topLat);
     // console.log(params.topLon);
     // console.log(params.botLat);
     // console.log(params.botLon);

     var lat_error=params.topLat-params.botLat;
     var lat_center=params.topLat-lat_error/2;
     var lon_error=params.topLon-params.botLon;
     var lon_center=params.topLon-lon_error/2;
 
     var latitudeDelta=Math.abs(lat_error);
     var cal_zoom=Math.log2(360 * ((window.innerHeight/256) / latitudeDelta));
     this.setState({
       deviceId : params.deviceId,
       filterByProvider : params.filterByProvider,
       filterByDeviceId : params.filterByDeviceId,
       boundary: {
           "topLeft": {
             "lat": params.topLat,
             "lon": params.topLon
           },
           "bottomRight": {
             "lat": params.botLat,
             "lon": params.botLon
           }
         },
       zoom:cal_zoom,
       center:{
         lat: lat_center,
         lng: lon_center
       },
     });
   }
 }

  render() {
    
    const apiKey = {key: Config.mapApiKey}
    const heatMapData = {
     positions: this.state.heatmapPoints,
     options: {
       radius: Config.radius,
       opacity: Config.opacity,
     }
    }
 
    return (
      <div className='hhh'>
         <GoogleMapReact
             ref={(el) => this._googleMap = el}
             bootstrapURLKeys={apiKey}
             defaultCenter={this.state.center}
             defaultZoom={this.state.zoom}
             options={this.getMapOptions}
             heatmapLibrary={true}     
             heatmap={heatMapData}
             onBoundsChange={this._onBoundsChange.bind(this)}
             >
        </GoogleMapReact>
      </div>
    )
  }
}

export default Mapheat
