import React, { useState, useEffect } from 'react';
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

export default function OutlinedCard(props) {
  const classes = useStyles(); 
  const [stateTempData, setStateTempData] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const [countryTempData, setCountryTempData] = useState([]);
  const [countryYearlyTempData,setCountryYearlyTempData] = useState([]);
  const [overallAvgTemp, setOverallAvgTemp]=useState('');
  const [showOverallAvg, setShowOverallAvg] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  function handleYearChange(value){
    setStartYear(value[0]);
    setEndYear(value[1]);
  }

  async function fetchDataState(){
    if (startYear < 1895 || endYear < 1895){
      alert("U.S. State Data is only available from 1895 - 2019. Please change your selected starting/ending years.");
      return;
    }
    setStateTempData([]);
    setCountryTempData([]);
    setCountryYearlyTempData([]);
    setErrorMessage('');
    const url = '/state_temp/'+props.stateName+'/'+startYear+'/'+endYear;
    try{
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok){
        const error = (json && json.message) || response.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
      setStateTempData(json.result);

    } catch (error){
      setErrorMessage(error.toString());
      console.log(error);
    }
  }

  async function fetchDataCountry(){
    setCountryTempData([]);
    setCountryYearlyTempData([]);
    setStateTempData([]);
    setErrorMessage('');
    const year_url = '/country_start_year/'+props.country;
    const year_response = await fetch(year_url);
    const year_json = await year_response.json();
    const min_year =year_json.result[0].year;
    console.log(min_year);
    if (min_year > parseInt(startYear)){
      alert("Temperature data on "+props.country+" from "+startYear+" to "+endYear+" was not available in our database. Please try again with a starting year of at least "+min_year+" and an ending of at most 2013.");
      return;
    }
    const url = '/country_temp/'+props.country+'/'+startYear+'/'+endYear;
    try{
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok){
        const error = (json && json.message) || response.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
        var temp = json.result;
        temp.sort((a,b)=>parseInt(a.year) - parseInt(b.year));
        setCountryTempData(temp);

    } catch (error){
      setErrorMessage(error.toString());
      console.log(error);
    }
  }

  useEffect(() => {
    var curYear = parseInt(startYear);
    var curTemp = 0;
    var yearlyTemps = [];
    if (countryTempData.length > 0){
      countryTempData.forEach(function(item){
        if (item.year===curYear){
          curTemp+=item.average_temp;
        }
        else{
          var avgTemp = curTemp/12;
          yearlyTemps.push({
            'average_temp':avgTemp,
            'country':item.country,
            'year':curYear
          });
          curTemp = item.average_temp;
          curYear = item.year;
        }
      })
      var avgTemp = curTemp/12;
      yearlyTemps.push({
        'average_temp':avgTemp,
        'country':props.country,
        'year':curYear
      });
      console.log(yearlyTemps);
      updateCountryYearly(yearlyTemps);
      console.log(countryYearlyTempData);
    }
  },[countryTempData]);

  useEffect(() => {
    console.log(props);
    if (startYear !== '' && endYear !== ''){
      if (props.stateName === ""){
        fetchDataCountry();
      }
      else if (props.country === ""){
        fetchDataState();
      }
    }
  },[props,startYear,endYear]);

  useEffect(()=>{
    if (countryYearlyTempData.length > 0){
      var overallTemp = countryYearlyTempData.reduce(function(prev,cur){
        return prev + cur.average_temp;
      },0)/countryYearlyTempData.length;
      setOverallAvgTemp(overallTemp);
      setShowOverallAvg(true);
    }
    else if (stateTempData.length > 0){
      var overallTemp = stateTempData.reduce(function(prev,cur){
        return prev + cur.average_temp;
      },0)/stateTempData.length;
      setOverallAvgTemp(overallTemp);
      setShowOverallAvg(true);
    }
  },[countryYearlyTempData,stateTempData])


  function updateCountryYearly(newData){
    setCountryYearlyTempData(newData);
    console.log(countryYearlyTempData);
  }


  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
            Location Name: {props.country} {props.stateName}
        </Typography>
        <br/>
        <CustomizedSlider onChangeCommitted={handleYearChange}/>
        <br/>
        <Typography className={classes.title} variant="body2" component="p">
          Average Temperature 
        </Typography>
        {stateTempData.map(row => (
            <li>
              Year: {row.year}, Average Temp: {row.average_temp}°C
            </li>
          ))}
        {countryYearlyTempData.map(row => (
            <li>
               Year: {row.year}, Average Yearly Temp: {row.average_temp}°C
            </li>
          ))}
          {showOverallAvg ? <div><hr></hr>Overall Average Temp: {overallAvgTemp}°C</div>: null}
        <br/>
        <Typography className={classes.title} variant="body2" component="p">
          Carbon Emissions
        </Typography>
      </CardContent>
    </Card>
  );
}
