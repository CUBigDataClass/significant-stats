import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import LocationBox from './components/LocationBox.js';
import Button from '@material-ui/core/Button';
import TemperatureStripes from './components/TemperatureStripes.js';
import OutlinedCard from './components/OutlinedCard';


function App() {

  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const temperature = 30;
  let hue = 200 + (160 * ( temperature / 100 ));
  console.log(hue);

  function handleLocationChange(newValue) {
    if (newValue != null){
      if (newValue.type=="Country"){
            setCountry(newValue.location);
            setStateName('');
            console.log(country);
          }
      else if (newValue.type=="State"){
        setStateName(newValue.location);
        setCountry('');
        console.log(stateName);
      }
    }
  }

  return (
    <div className="App">
      <div style={{
          left: '50%', display: 'block'
        }}>
          <LocationBox onChange={handleLocationChange}/>
          <br></br>
        </div>
        <TemperatureStripes/>
        <div style={{ position: 'absolute', left: '80%', top: '48%', transform: 'translate(-50%, -50%)'}}>
          <OutlinedCard country={country} stateName={stateName}/>
        </div>

    </div>

  );
}


export default App;
