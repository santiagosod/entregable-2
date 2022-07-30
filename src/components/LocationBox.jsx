import React from 'react'

const LocationBox = ({weather, dateBuilder, changeMetric, changeBtn, grades, icon}) => {
  return (
    <div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}{grades}
            </div>

          <div className="weather">{weather.weather[0].description}</div>

          <div className="button">
            <button className='btn' onClick={changeMetric}>{changeBtn}</button>
          </div>

          <div className="climate-icon">
            <img className={icon} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          </div>
        </div>
        </div>
        ) : ('')}
    </div>
  )
}

export default LocationBox