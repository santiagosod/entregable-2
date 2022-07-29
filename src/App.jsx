import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import SearchBox from './components/searchBox'
import LocationBox from './components/LocationBox'

const api = {
  key: 'd6556c46a7b8afc8a114de6f4b22e413',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [changeBtn, setChange] = useState('Change to °F')
  const [grades, setGrades] = useState('°C')
  const [lat, setLat] = useState('undefined')
  const [lon, setLon] = useState('undefined')
  const [bg, setBg] = useState('app')
  const [icon, setIcon] = useState('icons ')

  useEffect (() => {
    if(typeof weather.main != 'undefined'){
      if(weather.weather[0].main === 'Clouds'){
        setBg('app cloudy')
        setIcon(icon + 'fa-solid fa-cloud')
      } else if(weather.weather[0].main === 'Rain'){
        setBg('app rain')
        setIcon(icon + 'fa-solid fa-cloud-showers-heavy')
      } else if(weather.weather[0].main === 'Clear'){
        setBg('app clear')
        setIcon(icon + "fa-solid fa-sun")
      } else if(weather.weather[0].main === 'Sunny'){
        setBg('app sunny')
        setIcon(icon + "fa-solid fa-sun")
      } else if(weather.weather[0].main === 'Drizzle'){
        setBg('app drizzle')
        setIcon(icon + "fa-solid fa-cloud-rain")
      } else if(weather.weather[0].main === 'Mist'){
        setBg('app mist')
        setIcon(icon +"fa-solid fa-smog")
      }
    }
  }, [weather])

  const changeMetric = () => {
    if(unit === 'metric'){
      setUnit('imperial')
      setChange('Change to °C')
      setGrades('°F')
      setQuery(`${weather.name}, ${weather.sys.country}`)
    } else {
      setUnit('metric')
      setChange('Change to °F')
      setGrades('°C')
      setQuery(`${weather.name}, ${weather.sys.country}`)
    }
  }

  const coords = navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    setLat(latitude)
    setLon(longitude)
  })

  useEffect(() => {

    if(query != ''){
      axios.get(`${api.base}weather?q=${query}&units=${unit}&appid=${api.key}`)
      .then(res => {
        setWeather(res.data)
      })
    }
  }, [unit])

  useEffect(() => {
    if(lat != 'undefined'){
      axios.get(`${api.base}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${api.key}`)
        .then(res => {
          setWeather(res.data)
        })
    }
  },[lat, lon])

  const search = evt => {
    if (evt.key === 'Enter'){
      axios.get(`${api.base}weather?q=${query}&units=${unit}&appid=${api.key}`)
      .then(res => {
        setWeather(res.data)
        setQuery('')
        console.log(res.data);
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className={bg}>
      <main>
        <SearchBox query={query} search={search} setQuery={setQuery}/>

        <LocationBox weather={weather} dateBuilder={dateBuilder} changeMetric={changeMetric} changeBtn={changeBtn} grades={grades} icon={icon}/>
      </main>
    </div>
  )
}

export default App
