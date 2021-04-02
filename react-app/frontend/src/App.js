import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// import ComboBox from './components/ComboBox.js';
import CountryBox from './components/CountryBox.js';
import StatesBox from './components/StatesBox.js';
import StarYearBox from './components/StartYearBox.js';
import EndYearBox from './components/EndYearBox.js';
// import MapChart from './components/MapChart.js';
import Button from '@material-ui/core/Button';
//import MapChart from './components/MapChart';
import CountrySelect from './components/CountrySelect.js';
import TemperatureStripes from './components/TemperatureStripes.js';
import OutlinedCard from './components/OutlinedCard';

// const getData = async() =>
//   await fetch(`/data/Colorado`)
//   .then(res => (res.ok ? res : Promise.reject(res)))
//   .then(res => res.json())

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('https://significant-stats.herokuapp.com/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [stateTempData, setStateTempData] = useState([]);
  const [countryTempData, setCountryTempData] = useState([]);
  const [countryYearlyTempData,setCountryYearlyTempData] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const [showCountryForm, setShowCountryForm] = useState(false);
  const [showStateForm, setShowStateForm] = useState(false);
  const temperature = 30;
  let hue = 200 + (160 * ( temperature / 100 ));
  console.log(hue)

  const handleSubmitState = (evt) => {
    evt.preventDefault();
    if (stateName === '' || startYear === '' || endYear ===''){
      alert("Please fill in all of the fields above.");
    }
    else if (parseInt(startYear) < 1895 || parseInt(endYear) < 1895){
      alert("U.S. State Data is only available from 1895 - 2019. Please change your selected starting/ending years.")
    }
    else if (parseInt(startYear) > parseInt(endYear)){
      alert("Your selected year range is invalid. Please try again.")
    }
    else{
      setCountryTempData([]);
      setCountryYearlyTempData([]);
      setErrorMessage('');
      fetchDataState();
    }

  }

  const handleSubmitCountry = (evt) => {
    evt.preventDefault();
    if (country=== '' || startYear === '' || endYear ===''){
      alert("Please fill in all of the fields above.");
    }
    else if (parseInt(startYear) > parseInt(endYear)){
      alert("Your selected year range is invalid. Please try again.")
    }
    else{
      setStateTempData([]);
      setErrorMessage('');
      fetchDataCountry();
    }

  }

  async function fetchDataState(){
    const url = '/state_temp/'+stateName+'/'+startYear+'/'+endYear;
    try{
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok){
        const error = (json && json.message) || response.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
      setStateTempData(json.result);

    } catch (error){
      setErrorMessage(error.toString());
      console.log(error);
    }
  }

  async function fetchDataCountry(){
    const year_url = '/country_start_year/'+country;
    const year_response = await fetch(year_url);
    const year_json = await year_response.json();
    const min_year =year_json.result[0].year;
    console.log(min_year);
    if (min_year > parseInt(startYear)){
      alert("Temperature data on "+country+" from "+startYear+" to "+endYear+" was not available in our database. Please try again with a starting year of at least "+min_year+" and an ending of at most 2013.");
      return;
    }
    const url = '/country_temp/'+country+'/'+startYear+'/'+endYear;
    try{
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok){
        const error = (json && json.message) || response.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
        var temp = json.result;
        temp.sort((a,b)=>parseInt(a.year) - parseInt(b.year));
        setCountryTempData(temp);

    } catch (error){
      setErrorMessage(error.toString());
      console.log(error);
    }
  }

  useEffect(() => {
    var curYear = parseInt(startYear);
    var curTemp = 0;
    var yearlyTemps = [];
    if (countryTempData.length > 0){
      countryTempData.forEach(function(item){
        if (item.year===curYear){
          curTemp+=item.average_temp;
        }
        else{
          var avgTemp = curTemp/12;
          yearlyTemps.push({
            'average_temp':avgTemp,
            'country':item.country,
            'year':curYear
          });
          curTemp = item.average_temp;
          curYear = item.year;
        }
      })
      var avgTemp = curTemp/12;
      yearlyTemps.push({
        'average_temp':avgTemp,
        'country':country,
        'year':curYear
      });
      console.log(yearlyTemps);
      updateCountryYearly(yearlyTemps);
      console.log(countryYearlyTempData);
    }
  },[countryTempData]);

  function updateCountryYearly(newData){
    setCountryYearlyTempData(newData);
    console.log(countryYearlyTempData);
  }

  function handleCountryChange(newValue) {
    setCountry(newValue);
  }

  function handleStateChange(newValue) {
    setStateName(newValue);
  }

  function handleStartYearChange(newValue) {
    setStartYear(newValue);
  }

  function handleEndYearChange(newValue) {
    setEndYear(newValue);
  }

  function changeStateForm(){
    setShowCountryForm(false);
    setShowStateForm(true);
    console.log(showStateForm,showCountryForm);
  }

  function changeCountryForm(){
    setShowCountryForm(true);
    setShowStateForm(false);
    console.log(showStateForm,showCountryForm);
  }

  return (
    <div className="App">
      <div style={{
          position: 'absolute', left: '50%', top: '15%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* <CountrySelect/> */}
          <div>
          <Button variant="contained" color="primary" onClick={changeStateForm}>Show State Form</Button>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={changeCountryForm}>Show Country Form</Button>
        </div>
        <br></br>
        {showStateForm ? <div>
          <StatesBox onChange={handleStateChange}/>
          <StarYearBox value={startYear} onChange={handleStartYearChange}/>
          <EndYearBox value={endYear} onChange={handleEndYearChange}/>
          <form onSubmit={handleSubmitState}>
          <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
          </form>
        </div>: null}
        {showCountryForm ? <div>
          <CountryBox value={country} onChange={handleCountryChange}/>
          <StarYearBox value={startYear} onChange={handleStartYearChange}/>
          <EndYearBox value={endYear} onChange={handleEndYearChange}/>
           <form onSubmit={handleSubmitCountry}>
          <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
          </form>
        </div> :null}

    <ul>
          {stateTempData.map(row => (
            <li>
              {row.state}, Average Temp: {row.average_temp}, Year: {row.year}
            </li>
          ))}
          {countryTempData.map(row => (
            <li>
              {row.country}, Average Temp: {row.average_temp}, Year: {row.year}, Month {row.month}
            </li>
          ))}
          <hr></hr>
          {countryYearlyTempData.map(row => (
            <li>
              {row.country}, Average Yearly Temp: {row.average_temp}, Year: {row.year}
            </li>
          ))}
        </ul>
        <p>{errorMessage}</p>
        </div>
        <TemperatureStripes/>
        <div style={{ position: 'absolute', left: '80%', top: '48%', transform: 'translate(-50%, -50%)'}}>
          <OutlinedCard/>
        </div>

    </div>

  );
}


export default App;
