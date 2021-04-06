import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const marks = [
  {
    value: 1796,
    label: "1796"
  },
  {
    value: 2019,
    label: "2019"
  }
];

function valuetext(value) {
  return `${value}°C`;
}

export default function CustomSlider(props) {
  const classes = useStyles();

  const handleYearChange = (event, newValue) => {
    props.onChangeCommitted(newValue);
  };
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
      </Typography>
      <Slider
        defaultValue={[1900,2000]}
        min={1796}
        max={2019}
        onChangeCommitted={handleYearChange}
        marks={marks}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
