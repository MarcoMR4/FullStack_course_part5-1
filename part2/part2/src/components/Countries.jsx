
import { useState, useEffect } from "react";
import countriesService from "../services/countriesService";
import Country from "./Country";

const Countries = () => {

    const [countryToFind, setCountryToFind] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [countriesToShow, setCountriesToShow] = useState([]);

    useEffect(() => {
        countriesService
            .getAll()
            .then(countries => {
                setAllCountries(countries);
            })
            .catch(error => {
                console.log(`It occured an error to find countries: ${error}`);
            })

    }, [])

    const handleChangeCountry = (event) => {
        setCountryToFind(event.target.value);
        const filtered = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredCountries(filtered);
        // console.log(filteredCountries);
        if(filteredCountries.length < 10){
            setCountriesToShow(filteredCountries);
        }
        else{
            const message = { name: { common: 'Too many matches, please specify further.' } };            
            setCountriesToShow([message])
        }
    }

    return (
        <div>
            Find Countries
            <input type="text" onChange={handleChangeCountry} />
            {
                countriesToShow.map(country => (
                    <Country 
                        key = {country.name.common}
                        country = {country} 
                    />
                ))
            }
            

        </div>
    )

}

export default Countries;