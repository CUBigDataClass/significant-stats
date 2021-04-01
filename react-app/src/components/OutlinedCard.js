import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CustomizedSlider from './CustomizedSlider'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: 'left'
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
            Country Name
        </Typography>
        <br/>
        {/* <CustomizedSlider/> */}
        <Typography className={classes.title} variant="body2" component="p">
          Average Temperature
        </Typography>
        <br/>
        <Typography className={classes.title} variant="body2" component="p">
          Carbon Emissions
        </Typography>
      </CardContent>
    </Card>
  );
}
