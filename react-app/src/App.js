import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Async from 'react-async';
import ComboBox from './components/ComboBox.js';
import MapChart from './components/MapChart.js';
//import MapChart from './components/MapChart';

// const getData = async() =>
//   await fetch(`/data/Colorado`)
//   .then(res => (res.ok ? res : Promise.reject(res)))
//   .then(res => res.json())


function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [stateTempData, setStateTempData] = useState([]);
  const [countryTempData, setCountryTempData] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
 
  const handleSubmitState = (evt) => {
    evt.preventDefault();
    setCountryTempData([]);
    fetchDataState();
  }

  const handleSubmitCountry = (evt) => {
    evt.preventDefault();
    setStateTempData([]);
    fetchDataCountry();
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
    const url = '/country_temp/'+country+'/'+startYear+'/'+endYear;
    try{
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok){
        const error = (json && json.message) || response.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
      setCountryTempData(json.result);

    } catch (error){
      setErrorMessage(error.toString());
      console.log(error);
    }
  }

  // useEffect(async () => {
  //   fetch("/data/"+stateName+'/'+year)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setTempData(result.result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])
  

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ComboBox/>
        <MapChart/>
        <p>The current time is {currentTime}.</p>
        {/* <Async promiseFn={getData}>
          <Async.Loading>Loading...</Async.Loading>
          <Async.Fulfilled>
            {data => {
              return (
                <div>
                  <div>
                    <h2>React Async</h2>
                  </div>
                  {data.result.map(row=> (
                    <div key={row.state+row.year} className="row">
                      <div className="col-md-12">
                        <p>State:{row.state}</p>
                        <p>Average Temp:{row.average_temp}</p>
                        <p>Year:{row.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }}
          </Async.Fulfilled>
          <Async.Rejected>
            {error => `Something went wrong: ${error.message}`}
          </Async.Rejected>
      </Async> */}
      <form onSubmit={handleSubmitState}>
      <label>
        State:
        <input
          type="text"
          value={stateName}
          onChange={event => setStateName(event.target.value)}
        />
      </label>
      <label>
        Start Year:
        <input
          type="number"
          value={startYear}
          onChange={event => setStartYear(event.target.value)}
        />
      </label>
      <label>
        End Year:
        <input
          type="number"
          value={endYear}
          onChange={event => setEndYear(event.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
    <form onSubmit={handleSubmitCountry}>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={event => setCountry(event.target.value)}
        />
      </label>
      <label>
        Start Year:
        <input
          type="number"
          value={startYear}
          onChange={event => setStartYear(event.target.value)}
        />
      </label>
      <label>
        End Year:
        <input
          type="number"
          value={endYear}
          onChange={event => setEndYear(event.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
    <ul>
          {stateTempData.map(row => (
            <li>
              {row.state}, Average Temp: {row.average_temp}, Year: {row.year}
            </li>
          ))}
          {countryTempData.map(row => (
            <li>
              {row.country}, Average Temp: {row.average_temp}, Year: {row.year}
            </li>
          ))}
        </ul>
        <p>{errorMessage}</p>
      </header>
    </div>
  );
}

export default App;
