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
  const [tempData, setTempData] = useState({});
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

  function handleDataChange(value){
    setTempData(value);
  }


  useEffect(()=>{
    console.log(tempData);
    /*All temp data is stored in tempData.
    TempData has 4 attributes: stateData, countryMonthlyData, countryYearlyData, overallAvgTemp
    Check the length of stateData and countryMonthly/YearlyData to know which one to use*/
    if (Object.keys(tempData).length !== 0){
      console.log("We got data!");
      if (tempData.stateData.length > 0){
        //use state data
        console.log("We got s!");
      }
      else if (tempData.countryMonthlyData.length > 0){
        //use country data
        console.log("We got c!");
      }
    }
    
  },[tempData])

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
          <OutlinedCard country={country} stateName={stateName} onDataChange={handleDataChange} />
        </div>

    </div>

  );
}


export default App;
