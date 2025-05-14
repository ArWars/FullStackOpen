import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY

const fetchCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then((response) => response.data)
}

const fetchWeather = (latitude, longitude) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
    return request.then((response) => response.data)
}

export default {
    fetchCountries,
    fetchWeather
};