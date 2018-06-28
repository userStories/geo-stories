import React from 'react'
import { API_KEY } from './WeatherAPIKey'
// import GetLocation from './GetLocation'

const FSA_CHI_LAT = 41.9
const FSA_CHI_LON = -87.64

const fetchWeather = (lat=FSA_CHI_LAT, lon = FSA_CHI_LON, SetWeatherFunc) => {
  console.log('Calling FetchWeather with coords:', lat, lon)
  try {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
    )
    .then( res => res.json())
    .then( json => {
      console.log('Got the weather:', json)
      SetWeatherFunc(json)
      return ( json )
    })
  }
  catch(error){
    console.error('Error fetching weather:', error)
  }
}

const GetLocationWeather = (SetWeatherFunc) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('CurrentPosition:', position)
        fetchWeather(position.coords.latitude, position.coords.longitude, SetWeatherFunc)
      },
      (error) => { console.log(error) }
    )
}

export default GetLocationWeather;