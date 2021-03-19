import logo from './logo.svg';
import './App.css';
import ComboBox from './components/ComboBox.js';
import React from 'react';



function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <ComboBox/>
    </div>
  );
}


export default App;
