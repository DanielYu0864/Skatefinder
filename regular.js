const searchLocationInput = document.querySelector(".search-location");
const searchButton = document.querySelector("#search-btn");
const cityName = document.querySelector(".city-name");


function searchLocation(event) {
    event.preventDefault();
    const citySearched = searchLocationInput.value.trim();
    console.log(citySearched);

    requestCity(citySearched).then((data) => {
        updataWeather(data);
    }).catch((error) => {
        console.log(error);
    })
}

function updataWeather(city) {
    console.log(city);
    cityName.textContent = city.name;

    $(".condition").html(city.weather[0].description);
    $(".temp").html(((city.main.temp - 273.15) * 1.80 + 32).toFixed(0));


}

searchButton.addEventListener("click", searchLocation);