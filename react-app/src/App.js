import logo from './logo.svg';
import './App.css';
import CountrySelect from './components/CountrySelect.js';
import React from 'react';



function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <CountrySelect/>
        </div>
    </div>
  );
}


export default App;
