import {useEffect, useState} from "react";
import CountryInfo from "./CountryInfo.jsx";

const App = ({countries}) => {
    const [showDetails, setShowDetails] = useState(false)

    const handleShowDetails = (country) => {
        setShowDetails(!showDetails)
        if (showDetails) {
            setShowDetails(null)
        } else {
            setShowDetails(country)
        }
    }

    useEffect(() => {
        setShowDetails(null)
    }, [countries])

    return (
        <>
            {countries.length <= 10 ? (
                <>
                    {countries.length === 1 || showDetails ? (
                        <>
                            { showDetails && (
                                <CountryInfo country={showDetails} />
                            ) || countries.map(country => (
                                <CountryInfo country={country}/>
                            ))}
                        </>
                    ) : (
                        <>
                            {countries.map(country => (
                                <div key={country.name.common}>
                                    {country.name.common} <button onClick={() => handleShowDetails(country)}>Show</button>
                                </div>
                            ))}
                        </>
                    )}
                </>
            ) : (
                <p>
                    Too many matches, specify another filter
                </p>
            )}
        </>
    )
}

export default App