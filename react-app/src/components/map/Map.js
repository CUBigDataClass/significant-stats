import React, {Component} from 'react';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

const MAPBOX_TOKEN = ;
 
const INITIAL_VIEW_STATE = {
    longitude: -95.7129,
    latitude: 37.0902,
    zoom: 3,
    pitch: 0,
    bearing: 0
};

// const data = [
//     // {sourcePosition: [28.0339, 1.6596], targetPosition: [-122.41669, 37.781]}
//     {COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10},
//     {COORDINATES: [-120.42177834, 37.78346622], WEIGHT: 10}
// ];

class Map extends Component {
    
  state = {
    viewport: {
      width: 800,
      height: 600,
      latitude: 28.0339,
      longitude: 1.6596,
      zoom: 1
    }
  };
    
  render() {
  
     const { viewport } = this.state;
// new LineLayer({id: 'line-layer', data, getColor: [255, 200, 0]})
// 
     const layers = new HeatmapLayer ({
        id: 'heatmapLayer',
        data: [{"date":"1\/1\/2012","avg_temp":-2.268,"country":"United States","Month":1,"Coordinates":[-95.7129,37.0902]}],
        getPosition: d => d.Coordinates
     });
     
    return (
        <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        >
        <StaticMap
            // width={viewport.width}
            // height={viewport.height}
            // latitude={viewport.latitude}
            // longitude={viewport.longitude}
            // zoom={viewport.zoom}
            mapStyle='mapbox://styles/mapbox/dark-v10'
            mapboxApiAccessToken={MAPBOX_TOKEN}
            
            // onViewportChange={(viewport) => this.setState({viewport})}
        />
        </DeckGL>
    );
  }
}
    
export default Map;

