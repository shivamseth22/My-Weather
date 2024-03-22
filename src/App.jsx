import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import { api_key } from './Utility/Constant';
import snowflake from "../src/assets/snowflake.svg"
import sunny from "../src/assets/sunny.svg"
import warning from "../src/assets/warning.svg"
import thermometer from "../src/assets/thermometer.svg"
import wind from "../src/assets/wind.svg"

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    outline: 'none', // Remove the outline
  },
  '& .MuiInputAdornment-root': {
    marginLeft: 'auto', // Move the icon to the end
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black', // Change the outline color on focus
    border: "1px solid black"
  },
});

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  
  const [search, setSearch] = useState("ayodhya");
  const [erorrs, setErrors] = useState("")
  const [isloading, setIsLoading] = useState(false)

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    getWeatherData();
  };

  const getWeatherData = async () => {
    let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${search}`;
    try {
      setIsLoading(true)
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert("fjvnd")
      setErrors("No such location Found")
      console.log(error)
    } finally {
      console.log("done")
      setIsLoading(false)
    }

  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const temperature = weatherData?.current?.temp_c;

  let weatherIcon;
  if (temperature > 0 && temperature < 10) {
    weatherIcon = wind;
  } else if (temperature >= 10 && temperature < 21) {
    weatherIcon = thermometer;
  } else if (temperature >= 21 && temperature < 30) {
    weatherIcon = sunny;
  } else if (temperature >= 30) {
    weatherIcon = warning;
  } else {
    weatherIcon = snowflake; // Assuming wind icon for temperatures below 0°C
  }

  return (
    <Box
      style={{
        color: 'white',
        borderRadius: '0.6em',
        boxShadow: '0 1.8em 3.7em var(--shadow), 0px 4px 10px rgba(0, 0, 0, 0.1)',
        border: '2px solid var(--transp-white-2)',
        width: '100%',
        maxWidth: '500px',
        margin: '40px auto',
        padding: '3em 1.8em',
        background: "white",
        textAlign: 'center',
        border: "1px solid Black",
        minHeight:"500px"
      }}

    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={12}>
          <StyledTextField
            onChange={handleSearchChange}
            placeholder="Search..."
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid black',
              borderRadius: "0.6rem",
              width: '100%',

            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* Empty grid item to create space */}
        <Grid item xs={12} display={'flex'} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} color={"black"}>


          {
            isloading ? <CircularProgress style={{ color: 'black' , marginTop:"40%"}} />
              :

              <>


                <Grid item xs={12} display={'flex'} flexDirection={"column"} justifyContent={"cente"} alignItems={"center"} color={"Black"} mb={2}>
                  <Typography variant='h2' margin={"0px auto"}>{weatherData?.location?.name ? weatherData?.location?.name : 'Ayodhya'}</Typography>
                  <Typography variant='button' margin={"0px auto"}>{weatherData?.location?.region}</Typography>
                </Grid>
                <Grid item xs={12} display={'flex'} flexDirection={"column"} justifyContent={"cente"} alignItems={"center"} color={"Black"} mb={2} >
                  <img src={weatherIcon} alt="Weather Icon" style={{ width: "100px" }} />

                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={"cente"} alignItems={"center"} color={"Black"} mb={2} >
                  <Typography variant='h4' margin={"0px auto"}>Condition :{weatherData?.current?.condition.text}</Typography>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={"cente"} alignItems={"center"} color={"Black"} mb={2} >
                  <Typography variant='h5' margin={"0px auto"}>Temprature : {weatherData?.current?.temp_c} °C</Typography>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={"cente"} alignItems={"center"} color={"Black"} mb={2} >
                  <Typography variant='h5' margin={"0px auto"}>Humidity : {weatherData?.current?.humidity} g/m³</Typography>
                </Grid>
                <Grid item xs={12} display={'flex'} flexWrap={"wrap"} justifyContent={"cente"} alignItems={"center"} color={"Black"} mb={2} gap={2} >
                  <Typography variant='h5' margin={"0px auto"}>Wind Direction : {weatherData?.current?.wind_dir}</Typography>
                </Grid>
                <Grid item xs={12} mb={5} display={'flex'} flexWrap={"wrap"} justifyContent={"cente"} alignItems={"center"} color={"Black"}  gap={2} >
                  <Typography variant='h5' margin={"0px auto"}>WindSpeed : {weatherData?.current?.wind_kph} Km/Hr</Typography>

                </Grid>
              </>
          }
        </Grid>
      </Grid>

    </Box>
  );
};

export default App;
