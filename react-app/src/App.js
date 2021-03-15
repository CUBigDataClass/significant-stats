import logo from './logo.svg';
import './App.css';
import ComboBox from './components/ComboBox.js';
import MapChart from './components/MapChart.js';
import React from 'react';
//import MapChart from './components/MapChart';
import Map from './components/map/Map.js';

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
function App() {
    return (
      <Map/>
    );
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
