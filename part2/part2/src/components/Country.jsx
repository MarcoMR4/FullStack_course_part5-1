import { useEffect, useState } from "react";
import weatherCountryService from "../services/weatherCountryService";

const Country = ({ country }) => {
    const [showFeatures, setShowFeatures] = useState(false);
    const [weather, setWeather] = useState(null); 

    const handleShowCountryFeatures = () => {
        setShowFeatures(!showFeatures);
    };

    useEffect(() => {
        if (showFeatures) {
            const lat = country.capitalInfo.latlng[0];
            const lon = country.capitalInfo.latlng[1];
            const apiKey = import.meta.env.VITE_SOME_KEY;

            weatherCountryService
                .getWeather(lat, lon, apiKey)
                .then(data => {
                    setWeather({
                        lat: data.lat || "",
                        lon: data.lon || "",
                        elevation: data.elevation ?? null,
                        timezone: data.timezone || "",
                        units: data.units || "",
                        current: {
                            icon: data.current?.icon || "",
                            icon_num: data.current?.icon_num ?? null,
                            summary: data.current?.summary || "No data",
                            temperature: data.current?.temperature ?? null,
                            wind: {
                                speed: data.current?.wind?.speed ?? null,
                                angle: data.current?.wind?.angle ?? null,
                                dir: data.current?.wind?.dir || ""
                            },
                            precipitation: {
                                total: data.current?.precipitation?.total ?? null,
                                type: data.current?.precipitation?.type || ""
                            },
                            cloud_cover: data.current?.cloud_cover ?? null
                        },
                        hourly: data.hourly ?? null,
                        daily: data.daily ?? null
                    });
                })
                .catch(error => {
                    console.error(`We couldn't get the weather info: ${error}`);
                });
        }
    }, [showFeatures]);

    return (
        <div className="border">
            <p key={country.name.common}>
                {country.name.common}
                &nbsp; &nbsp;
                <button onClick={handleShowCountryFeatures}>show</button>
            </p>

            {showFeatures && (
                <div>
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Area:</strong> {country.area}</p>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>

                    <h4>Weather in {country.name.official}:</h4>
                    
                    {weather ? (
                        <>
                            <p><strong>Summary:</strong> {weather.current.summary}</p>
                            <p><strong>Temperature:</strong> {weather.current.temperature}°C</p>
                            <p><strong>Wind:</strong> {weather.current.wind.speed} m/s, {weather.current.wind.dir}</p>
                            <p><strong>Cloud Cover:</strong> {weather.current.cloud_cover}%</p>
                        </>
                    ) : (
                        <p>Loading weather data...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Country;
