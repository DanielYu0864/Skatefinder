const searchLocationInput = document.querySelector(".search-location");
const searchButton = document.querySelector("#search-btn");
const cityName = document.querySelector(".city-name");
const container = document.querySelector("#container");
const mapDiv = document.querySelector("#map-display");
const gameExplain = document.querySelector("#app-explain");
let parkBtn = document.querySelector(".park");
let shopBtn = document.querySelector(".shop");
let checkParkOrShop = true;

//function for search the user input and run the map and weather
function searchLocation(event) {
    event.preventDefault();
    const citySearched = searchLocationInput.value.trim();
    console.log(citySearched);
    loadMap(citySearched);
    requestCityWeather(citySearched).then((data) => {
        // initMap(data);
        updataWeather(data);

    }).catch((error) => {
        console.log(error);
    })
}
// weather info
function updataWeather(city) {
    console.log(city);
    cityName.textContent = city.name;

    $(".condition").html(city.weather[0].description);
    $(".temp").html(((city.main.temp - 273.15) * 1.80 + 32).toFixed(0));
    container.classList.remove("display-none");
    gameExplain.classList.add("display-none");
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
// forecast weather
function forecastWeather(response) {
    console.log(response);
    for (let i=0;i<5;i++){
        let date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        let tempK = response.list[((i+1)*8)-1].main.temp;
        let tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(0);
        let condition = response.list[((i+1)*8)-1].weather[0].description;
        let humidity = response.list[((i+1)*8)-1].main.humidity;
        let pop = response.list[((i+1)*8)-1].pop*100;
        $("#fDate"+i).html(date);
        $("#fTemp"+i).html(tempF);
        $("#fCondition"+i).html(condition);
        $("#fHumidity"+i).html(` ${humidity}%`);
        $("#fPop"+i).html(pop);

    }
}
// UV index
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
// function to load the map API and button to swicth the skate park and skate borad shop
const loadMap = (e) => {
    console.log(e);
    mapDiv.innerHTML = '<iframe class="parkMap" frameborder="0" style="border:0"> yo </iframe>';
    const mapI = document.querySelector(".parkMap");
    mapI.setAttribute("style", "width:100%; height:40vw");

    if (checkParkOrShop = true) {
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${e}&key=${googleMapApiKey}`);
    } else {
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatesboradshop+in+${e}&key=${googleMapApiKey}`);
    }

    $(parkBtn).on("click",() =>{
        checkParkOrShop = true;
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${e}&key=${googleMapApiKey}`);
    });
    $(shopBtn).on("click",() =>{
        checkParkOrShop = false;
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skateshop+in+${e}&key=${googleMapApiKey}`);
    });
}







// search button event listener
searchButton.addEventListener("click", searchLocation);
