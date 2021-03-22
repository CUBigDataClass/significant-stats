import logo from './logo.svg';
import './App.css';
import CountrySelect from './components/CountrySelect.js';
import TemperatureStripes from './components/TemperatureStripes.js';
import React from 'react';

function App() {
  const temperature = 30;
  let hue = 200 + (160 * ( temperature / 100 ));
  console.log(hue)

  return (
    <div className="App">
        <div style={{
          position: 'absolute', left: '50%', top: '10%',
          transform: 'translate(-50%, -50%)'
        }}>
          <CountrySelect/>
        </div>
        <TemperatureStripes/>
    </div>
  );
}


export default App;
