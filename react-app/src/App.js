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

export default App;
