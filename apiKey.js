const openWeatherApiKey = "e93223a6b1823d41860077c8e54b5206"; // D
const googleMapApiKey = "AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4"; // D

const requestCity = async (cityName) => {
    const WeatherURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${cityName}&appid=${openWeatherApiKey}`;
    const response = await fetch((WeatherURL + query), {method: "GET"});
    const data = await response.json();
    return data;
}