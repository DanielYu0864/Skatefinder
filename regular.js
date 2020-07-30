const searchLocationInput = document.querySelector(".search-location");
const searchButton = document.querySelector("#search-btn");
const cityName = document.querySelector(".city-name");


function searchLocation(event) {
    event.preventDefault();
    const citySearched = searchLocationInput.value.trim();
    console.log(citySearched);

    requestCityWeather(citySearched).then((data) => {
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

    requestCityUVI(city).then((data) => {
        uvIndex(data);
    }).catch((error) => {
        console.log(error);
    })

    requestCityForecast(city.id).then((data) => {
        forecastWeather(data);
    }).catch((error) => {
        console.log(error);
    })

}

function forecastWeather(response) {
    console.log(response);
    for (let i=0;i<5;i++){
        let date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        let tempK = response.list[((i+1)*8)-1].main.temp;
        let tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(0);
        let condition = response.list[((i+1)*8)-1].weather[0].description;
        let humidity = response.list[((i+1)*8)-1].main.humidity;

        $("#fDate"+i).html(date);
        $("#fTemp"+i).html(tempF);
        $("#fCondition"+i).html(condition);
        $("#fHumidity"+i).html(` ${humidity}%`);
    }
}

function uvIndex(response) {
    const uviResults = response;
    const uvi = uviResults.value;
    $(".uv-index").html(uvi);

    if (uvi < 3) {
        $(".uv-index").css("background-color", "green");
      } else if (uvi < 6) {
        $(".uv-index").css("background-color", "yellow");
      } else if (uvi < 8) {
        $(".uv-index").css("background-color", "orange");
      } else if (uvi < 11) {
        $(".uv-index").css("background-color", "red");
      } else {
        $(".uv-index").css("background-color", "purple");
      }
}

searchButton.addEventListener("click", searchLocation);