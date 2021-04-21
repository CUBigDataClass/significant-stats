import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import VideoBg from "reactjs-videobg";

import LocationBox from './components/LocationBox.js';
import Button from '@material-ui/core/Button';
import TemperatureStripes from './components/TemperatureStripes.js';
import OutlinedCard from './components/OutlinedCard';
import { colors } from '@material-ui/core';

import backgroundVideo from './components/bgVid.mp4'


function App(props) {

  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [tempData, setTempData] = useState({});


  function handleLocationChange(newValue) {
    if (newValue != null){
      if (newValue.type=="Country"  || newValue.type=="Continent"){
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
      <VideoBg>
        <VideoBg.Source src={backgroundVideo} type="video/mp4" />
      </VideoBg>;
      {/* Maybe implement video background of Earth if I can figure out style problems */}
      {/* <video autoPlay loop muted id='video' style={{
        position:'absolute',
        zIndex:-1,
        width:'100%',
        left: '50%',
        top: '50%',
        height:'auto',
        objectFit:'cover',
        transform: 'translate(-50%,-50%)',
        color: 'rgba(255,255,255,0.5)'
      }}>
        <source src={backgroundVideo} type='video/mp4'/>
      </video> */}
      <div style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
          <div>
            <LocationBox onChange={handleLocationChange}/>
            <br></br>
          </div>
          <div style={{ position: 'relative'}}>
            <OutlinedCard country={country} stateName={stateName} onDataChange={handleDataChange} />
          </div>
      </div>

    </div>

  );
}


export default App;
