const apiKey = "361df15a2c02a4ded4891a40226de170";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const wIcon = document.querySelector(".w-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            wIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Rain") {
            wIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            wIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Haze") {
            wIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keyup", (e)=>{
    if(e.keyCode === 13){
        checkWeather(searchBox.value);
    }
})