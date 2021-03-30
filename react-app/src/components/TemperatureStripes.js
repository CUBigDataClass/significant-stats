import React from 'react';
import ReactDOM from 'react-dom';
import './TemperatureStripes.css';

var stripeCounter = 0;

function getStripe(temp, numOfEntries) {
     var hue = 200 + (160 * ( temp / 100 ));
     var stripeWidth = 100 / numOfEntries;
    console.log(stripeWidth)
     var widthPercent = stripeWidth + '%';
     console.log(widthPercent)
     console.log(stripeCounter)
     var moveLeft = stripeCounter * stripeWidth - 100;
     console.log(moveLeft)
     var leftPercent = moveLeft + '%';

     console.log(leftPercent);
     console.log("next");
     stripeCounter++;
     return <div key={stripeCounter} className="stripe" style={{
                                               left: leftPercent,
                                               width: widthPercent,
                                               backgroundColor: `hsl(${hue}, 100%, 50%)`,
                                             }}> </div>

  }

function TemperatureStripes() {
  var temperatures = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  var length = temperatures.length;

  return (

    <div className="box">
        {temperatures.map((tmp)=>{
            return getStripe(tmp, length)
        })}
    </div>
  );
}

export default TemperatureStripes;