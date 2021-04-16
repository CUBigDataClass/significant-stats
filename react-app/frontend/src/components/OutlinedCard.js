import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CustomizedSlider from './CustomizedSlider';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TemperatureStripes from './TemperatureStripes.js';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
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
  const [std,setStd]=useState('');
  const [countryEmission, setCountryEmission] = useState([]);
  const [showEmission, setShowEmission] = useState(false);
  const [startYear, setStartYear] = useState(1990);
  const [endYear, setEndYear] = useState(2000);
  const [tempData, setTempData]= useState({});


  function handleYearChange(value){
    setStartYear(value[0]);
    setEndYear(value[1]);
  }

  async function fetchDataState(){
    setStateTempData([]);
    setCountryTempData([]);
    setCountryYearlyTempData([]);
    setCountryEmission([]);
    setOverallAvgTemp('');
    setStd('')
    setErrorMessage('');
    setShowOverallAvg(false);
    if (startYear < 1895 || endYear < 1895){
      alert("U.S. State Data is only available from 1895 - 2019. Please change your selected starting/ending years.");
      return;
    }
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
    setStateTempData([]);
    setCountryTempData([]);
    setCountryYearlyTempData([]);
    setCountryEmission([]);
    setOverallAvgTemp('');
    setStd('')
    setErrorMessage('');
    setShowOverallAvg(false);
    const year_url = '/country_start_year/'+props.country;
    const year_response = await fetch(year_url);
    const year_json = await year_response.json();
    const min_year =year_json.result[0].year;
    console.log(min_year);
    if (min_year > parseInt(startYear)){
      alert("Temperature data on "+props.country+" from "+startYear+" to "+endYear+" was not available in our database. Please try again with a starting year of at least "+min_year+" and an ending of at most 2013.");
      return;
    }
    const urlTemp = '/country_temp/'+props.country+'/'+startYear+'/'+endYear;
    const urlEm = '/country_emission/'+props.country+'/'+startYear+'/'+endYear;
    try{
      const responseTemp = await fetch(urlTemp);
      const jsonTemp = await responseTemp.json();
      if (!responseTemp.ok){
        const error = (jsonTemp && jsonTemp.message) || responseTemp.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
        var temp = jsonTemp.result;
        temp.sort((a,b)=>parseInt(a.year) - parseInt(b.year));
        setCountryTempData(temp);

    } catch (error){
      setErrorMessage(error.toString());
      console.log(error);
    }
    try{
      const responseEm = await fetch(urlEm);
      const jsonEm= await responseEm.json();
      if (!responseEm.ok){
        const error = (jsonEm && jsonEm.message) || responseEm.statusText;
        setErrorMessage(error);
        return Promise.reject(error);
      }
        var emission = jsonEm.result;
        console.log(emission);
        setCountryEmission(emission);

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
      updateCountryYearly(yearlyTemps);
    }
  },[countryTempData]);

  useEffect(() => {
    if (startYear !== '' && endYear !== ''){
      if (props.stateName === "" && props.country !== ""){
        fetchDataCountry();
      }
      else if (props.country === "" && props.stateName!== ""){
        fetchDataState();
      }
    }
  },[props.stateName,props.country,startYear,endYear]);

  useEffect(()=>{
    if (countryYearlyTempData.length > 0){
      var overallTemp = countryYearlyTempData.reduce(function(prev,cur){
        return prev + cur.average_temp;
      },0)/countryYearlyTempData.length;
      var curStd = countryYearlyTempData.reduce(function(total,cur){
        var dev = cur.average_temp - overallTemp;
        var devSqrd = dev*dev;
        return total+devSqrd;
      },0)/countryYearlyTempData.length;
      curStd = Math.sqrt(curStd);
      setStd(curStd);
      setOverallAvgTemp(overallTemp);
      setShowOverallAvg(true);
    }
    else if (stateTempData.length > 0){
      var overallTemp = stateTempData.reduce(function(prev,cur){
        return prev + cur.average_temp;
      },0)/stateTempData.length;
      var curStd = stateTempData.reduce(function(total,cur){
        var dev = cur.average_temp - overallTemp;
        var devSqrd = dev*dev;
        return total+devSqrd;
      },0)/stateTempData.length;
      curStd = Math.sqrt(curStd);
      setStd(curStd);
      setOverallAvgTemp(overallTemp);
      setShowOverallAvg(true);
    }
  },[countryYearlyTempData,stateTempData])

  useEffect(()=>{
    setTempData({
      'stateData':stateTempData,
      'countryMonthlyData':countryTempData,
      'countryYearlyData':countryYearlyTempData,
      'overallAvgTemp':overallAvgTemp,
      'std':std,
      'emission':countryEmission
    });
    if (countryEmission.length>0){
      setShowEmission(true);
    }
    else{
      setShowEmission(false);
    }
  },[countryEmission, overallAvgTemp])


  function updateCountryYearly(newData){
    setCountryYearlyTempData(newData);
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
        {showOverallAvg ? <div>
        <Typography className={classes.title} variant="body2" component="p">
          Average Temperature
        </Typography>
        <Paper style={{maxWidth:'25%',margin: 'auto',
            width: '50%'
            }}>
          <TableContainer style={{maxHeight: 400}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Average Temperature (°C)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {stateTempData.map(row => (
                <TableRow key={row.year}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.average_temp.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {countryYearlyTempData.map(row => (
                <TableRow key={row.year}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.average_temp.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

            <br></br>
            <Typography className={classes.title} variant="body2" component="p">Overall Average Temp: {overallAvgTemp}°C</Typography>
            <h3> Average temperature over the years </h3>
          <TemperatureStripes tempData={tempData}/>
            </div>: null}
          <br></br>
        <br/>
        {showEmission ? <div>
          <hr></hr>
        <Typography className={classes.title} variant="body2" component="p">
          Carbon Emissions
        </Typography>
        <Paper style={{maxWidth:'25%', margin: 'auto',
          width: '50%'
          }}>
          <TableContainer style={{maxHeight: 400}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>CO<sub>2</sub> and Greenhouse Gas Emission (t)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {countryEmission.map(row => (
                <TableRow key={row.year}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.emission}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <br></br>
        <EmissionsGraph countryEmission={countryEmission}/>
        </div>
        : null}

      </CardContent>
    </Card>
  );
}
