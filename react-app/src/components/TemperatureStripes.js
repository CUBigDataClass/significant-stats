import React from 'react';
import './TemperatureStripes.css';

export default function TemperatureStripes() {
  const temperature = 30;
  let hue = 200 + (160 * ( temperature / 100 ));
  console.log(hue)
  return (
//    <div style={{backgroundColor: `hsl(${hue}, 100%, 50%)`}}>
//        Hello
//    </div>
    <div className="box">
        Hello
    </div>
  );
}