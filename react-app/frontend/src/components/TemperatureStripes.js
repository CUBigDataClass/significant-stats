import React from 'react';
import ReactDOM from 'react-dom';
import './TemperatureStripes.css';
import tempKey from './temp-stripes-key.png';

var stripeCounter = 0;
var normalize = 1;

function temperatureToColor(temp, tempStats) {
    return ((1/(tempStats.stdDev * Math.sqrt(2*Math.PI)))*Math.exp(-(Math.pow(temp - tempStats.avgTemp,2))/(2*(Math.pow(tempStats.stdDev, 2)))));
}

function getBrightness(temp, tempStats) {
    var result = normalize*temperatureToColor(temp, tempStats) + 0.2;
    var brightness = result*100;
    if (brightness > 95) {
        return 95;
    } else if (brightness < 20) {
        return 20;
    }
    return brightness;
}

function getHue(temp, avgTemp) {
    var red = 0;
    var blue = 200;
    var light_blue = 195;
    var light_red = 10;
    if (temp >= avgTemp) {
        return red;
    } else {
        return blue;
    }
}

function getStripe(ctemp, numOfEntries, tempStats) {
     var temp = ctemp;
     var hue = getHue(temp, tempStats.avgTemp);
     var l = getBrightness(temp, tempStats);
     var stripeWidth = 100 / numOfEntries;
     var widthPercent = stripeWidth + '%';
     var moveLeft = 0;
     moveLeft = (stripeCounter * stripeWidth);
     var leftPercent = moveLeft + '%';

     stripeCounter++;
     return <div key={stripeCounter} className="stripe" style={{
                                               left: leftPercent,
                                               width: widthPercent,
                                               backgroundColor: `hsl(${hue}, 100%, ${l}%)`,
                                             }}> </div>

  }

function TemperatureStripes({tempData}) {
  stripeCounter = 0;
  normalize = 1;
  var avgTemp = 0;
  var data = [{average_temp: 8, average_temp: 9}];
  var length = 0;
  var stdDev = 0;
  var maxTemp = 0;
  var minTemp = 999;
  var tempStats = {};

  if (!(Object.keys(tempData).length === 0 && tempData.constructor === Object)) {
    data = (tempData.stateData.length > 0) ? tempData.stateData : tempData.countryYearlyData;
    length = data.length;

    avgTemp = tempData.overallAvgTemp;
    stdDev = tempData.std;
    maxTemp = Math.max.apply(Math, data.map(function(item) { return item.average_temp; }))
    minTemp = Math.min.apply(Math, data.map(function(item) { return item.average_temp; }))

    tempStats = {
        "avgTemp": avgTemp,
        "stdDev": stdDev,
        "maxTemp": maxTemp,
        "minTemp": minTemp
    };
    normalize = 1/(temperatureToColor(avgTemp, tempStats) + 0.3);
  }


  return (
  <div>
    <div className="box">
        {data.map((row)=>{
            return getStripe(row.average_temp, length, tempStats)
        })}
    </div>
    <img src={tempKey} style={{ width: 400}}/>
  </div>
  );
}

export default TemperatureStripes;