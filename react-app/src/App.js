import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Async from 'react-async';
import ComboBox from './components/ComboBox.js';
import MapChart from './components/MapChart.js';
//import MapChart from './components/MapChart';

const getData = async() =>
  await fetch(`/data`)
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())


function App() {
  const [currentTime, setCurrentTime] = useState(0);

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
        <Async promiseFn={getData}>
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
      </Async>
      </header>
    </div>
  );
}

export default App;
