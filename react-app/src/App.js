import logo from './logo.svg';
import './App.css';
import ComboBox from './components/ComboBox.js';
import MapChart from './components/MapChart.js';
//import MapChart from './components/MapChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ComboBox/>
        <MapChart/>
      </header>
    </div>
  );
}

export default App;
