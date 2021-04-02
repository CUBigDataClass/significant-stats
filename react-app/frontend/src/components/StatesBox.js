import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function StateBox(props) {

  function handleStateChange(event,value) {
    // Here, we invoke the callback with the new value
    props.onChange(value);
}

function boxSubmitHandler(event){
    event.preventDefault();
  }

  return (
    <Autocomplete
      id="state-box"
      options={states}
      style={{ position:'relative', top:'10%', left: '40%', width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" />}
      onChange={handleStateChange}
      onSubmit={boxSubmitHandler}
    />
  );
}

const states = ['Indiana','Florida','Delaware','Rhode Island','Connecticut','Pennsylvania','Oklahoma','New York',
'Ohio','New Jersey','Nevada','Wyoming','Nebraska','West Virginia','North Dakota','Kansas','South Carolina',
'North Carolina','Georgia','Alabama','Arizona','Virginia','Maine','New Hampshire','Illinois','Montana',
'Massachusetts','South Dakota','Mississippi','Missouri','New Mexico','California','Michigan','Wisconsin',
'Vermont','Oregon','Louisiana','Washington','Idaho','Utah','Colorado','Minnesota','Texas','Arkansas',
'Kentucky','Maryland','Tennessee','Iowa'

];
states.sort()
