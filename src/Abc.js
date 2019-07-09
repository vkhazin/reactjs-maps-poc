/* global google */
import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

export const DataLoadingHeatmap = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: this.props.center,
        data: this.props.heatmapRawData,
        markers: [],
        mapData: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          }, function() {
            if (this.props.onMove) {
              this.props.onMove(this.state.bounds, this.state.center);
            }
          });
        },
      })
    },
    componentWillReceiveProps(nextProps) {
      var filteredData = [];
      if (nextProps.heatmapRawData !== this.state.data) {
        this.setState({
          data: nextProps.heatmapRawData
        });
        for (var i = 0; i < nextProps.heatmapRawData.length; i++) {
          const point = nextProps.heatmapRawData[i];
          const htmapPoint = {
            location: new google.maps.LatLng(
              point.lat,
              point.lng
            ), 
            weight: point.weight
          };
          filteredData.push(htmapPoint);
        }
        // after loop is done, update heatmap data
        this.setState({mapData: filteredData});
      }
    },
  }),
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={props.zoom}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <HeatmapLayer
      data={props.mapData}
      options={{radius: 20}}
    />
  </GoogleMap>
);