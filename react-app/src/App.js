import logo from './logo.svg';
import './App.css';
import ComboBox from './components/ComboBox.js';
import MapChart from './components/MapChart.js';
import React, { Component } from 'react';
//import MapChart from './components/MapChart';
import Map from './components/map/Map.js';

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
} // our location object from earlier
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Header2
        <img src={logo} className="App-logo" alt="logo" />
        <ComboBox/>
        <MapChart/>
      </header>
      <MapSection location={location} zoomLevel={17} /> 
    </div>
  );
}
*/
class App extends Component {
    render() {
      return (
        <div className="App">
          <Map/>
        </div>
      );
    }
  }

/*
function loadMapApi() {
  var API_key = 'AIzaSyAcJR1spSFgCcXDKofMGAVGd-7xdkvDZlg';
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + API_key + '&callback=initMap';
  script.async = true;
  document.body.appendChild(script);
}
*/

export default App;
