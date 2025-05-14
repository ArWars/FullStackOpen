import {useState, useEffect} from "react";
import SearchCountries from "./components/Filter.jsx";
import CountriesList from "./components/Countries.jsx";
import fetchAPI from "./services/fetchAPI.js";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchAPI.fetchCountries().then(response => {
            setCountries(response)
        })
    }, []);

    useEffect(() => {
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredCountries(filtered)
    }, [countries]);

    const handleSearchChange = (event) => {
        const term = event.target.value
        setSearchTerm(term)
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(term.toLowerCase()))
        setFilteredCountries(filtered)
    }

    return (
        <div>
            <SearchCountries searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <CountriesList countries={filteredCountries} searchTerm={searchTerm} />
        </div>
    )
}

export default App