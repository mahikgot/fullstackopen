import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Single = ({countryData}) => {
    const [cityData, setCityData] = useState([])

    useEffect(() =>
        axios
        .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then(
            ({data}) => setCityData([data.main.temp, data.wind.speed, data.wind.deg])
        )

    , [countryData.capital])


    return (
        <>
            <h1>
                {countryData.name}
            </h1>
            <div>capital {countryData.capital}</div>
            <div>population {countryData.population}</div>
            <h3>
               languages
            </h3>
            <ul>
                {countryData.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={countryData.flag} alt='flag' />
            <h3>
                Weather in {countryData.name}
            </h3>
            <h5>
            <div>
                temperature: {cityData[0]} K
            </div>
            <div>
                wind: {cityData} m/s {cityData[2]} degrees
            </div>
            </h5>
        </>
    )
}
export default Single
