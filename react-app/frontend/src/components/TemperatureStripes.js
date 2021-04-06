import React from 'react';
import ReactDOM from 'react-dom';
import './TemperatureStripes.css';

var stripeCounter = 0;
var normalize = 1;

function temperatureToColor(temp, tempStats) {
    return ((1/(tempStats.stdDev * Math.sqrt(2*Math.PI)))*Math.exp(-(Math.pow(temp - tempStats.avgTemp,2))/(2*(Math.pow(tempStats.stdDev, 2)))));
}

function getBrightness(temp, tempStats) {
//    return (-25*(Math.pow((temp - tempStats.avgTemp), 2))) + 85;
    var result = normalize*temperatureToColor(temp, tempStats);
    var brightness = result*100;
//    console.log(brightness);
    if (brightness > 95) {
        console.log("brightness over 95");
        console.log(temp);
        console.log(brightness);
        return 95;
    } else if (brightness < 20) {
        console.log("brightness under 15");
        console.log(temp);
        console.log(brightness);
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
//     var temp = (9/5)*ctemp + 32;
     var temp = ctemp;
//     var hue = 200 + (160 * ( temp / 100 ));
     var hue = getHue(temp, tempStats.avgTemp);
     var l = getBrightness(temp, tempStats);
//     console.log("next");
//     console.log(ctemp)
//     console.log(temp);
//     console.log(hue);
//     console.log(l);
     var stripeWidth = 100 / numOfEntries;
     var widthPercent = stripeWidth + '%';
//     console.log(widthPercent);
     var moveLeft = 0;
     moveLeft = (stripeCounter * stripeWidth);
     var leftPercent = moveLeft + '%';
//     console.log(leftPercent);

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
  console.log(tempData)
  var avgTemp = 0;
  var data = [{average_temp: 8, average_temp: 9}];
  var length = 0;
  var stdDev = 0;
  var maxTemp = 0;
  var minTemp = 999;
  var tempStats = {};

  if (!(Object.keys(tempData).length === 0 && tempData.constructor === Object)) {
    console.log(tempData.std);
    data = tempData.countryYearlyData;
    length = data.length;
//    avgTemp = (9/5)*tempData.overallAvgTemp + 32;
    avgTemp = tempData.overallAvgTemp;
    stdDev = tempData.std;
    maxTemp = Math.max.apply(Math, data.map(function(item) { return item.average_temp; }))
    minTemp = Math.min.apply(Math, data.map(function(item) { return item.average_temp; }))
    console.log(maxTemp)
    console.log(minTemp)

    tempStats = {
        "avgTemp": avgTemp,
        "stdDev": stdDev,
        "maxTemp": maxTemp,
        "minTemp": minTemp
    };
    console.log(tempStats);
    normalize = 1/(temperatureToColor(avgTemp, tempStats) + 0.1);
    console.log(normalize);
  }

  console.log("length");
  console.log(length);

  return (
    <div className="box">
        {data.map((row)=>{
            return getStripe(row.average_temp, length, tempStats)
        })}
    </div>
  );
}

export default TemperatureStripes;