import axios from "axios";

const baseUrl = "https://www.meteosource.com/api/v1/free/point";

const getWeather = (lat, lon, apiKey) => {
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&sections=current&language=en&units=auto&key=${apiKey}`;
    return axios.get(url).then(response => response.data);
}

export default { getWeather };
