import fetchAPI from "../services/fetchAPI.js";
import {useEffect, useState} from "react";

const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (country.capitalInfo) {
            setLoading(true)
            fetchAPI.fetchWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]).then(r => {
                setWeather(r)
                setLoading(false)
            })
        }
    }, [country.capitalInfo]);

    return (
        <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <h2>Weather in {country.capital}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                weather && (
                    <>
                        <p>Temperature {weather.main.temp} Celsius</p>
                        <img src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt={weather.weather[0].description} />
                        <p>Wind {weather.wind.speed} m/s</p>
                        <p>Humidity {weather.main.humidity}%</p>
                    </>
                )
            )}
        </div>
    )
}

export default CountryInfo