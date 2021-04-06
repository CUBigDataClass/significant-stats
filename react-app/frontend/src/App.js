import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import LocationBox from './components/LocationBox.js';
import Button from '@material-ui/core/Button';
import TemperatureStripes from './components/TemperatureStripes.js';
import OutlinedCard from './components/OutlinedCard';
import { colors } from '@material-ui/core';


function App(props) {

  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [overallAvgTemp, setOverallAvgTemp]= useState('');
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

  function handleChange(value){
    setOverallAvgTemp(value);
  }

  useEffect(()=>{
    console.log(overallAvgTemp);
  },[overallAvgTemp])

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
          <OutlinedCard country={country} stateName={stateName} onAvgTempChange={handleChange}/>
        </div>

    </div>

  );
}


export default App;
