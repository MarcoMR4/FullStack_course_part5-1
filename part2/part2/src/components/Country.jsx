import { useState } from "react";

const Country = ( {country} ) => {
    const [countrySelected, setCountrySelected] = useState(country);
    const [showFeatures, setShowFeatures] = useState(false);

    const handleShowCountryFeatures = () => {
       setShowFeatures(!showFeatures);
    }

    return (
        <div className = "border">
            <p key = {country.name.common}>
                {country.name.common}
                &nbsp; &nbsp;
                <button onClick = {handleShowCountryFeatures}>show</button>
            </p>

            {showFeatures && (
                <div>
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Area:</strong> {country.area}</p>
                    <br />
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
                    <br />
                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>

                    <h4>Weather in {country.name.official}:</h4>
                    
                </div>
            )}


        </div>
    )
}

export default Country;