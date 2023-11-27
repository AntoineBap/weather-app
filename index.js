document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'f54d78aa16b1d5f5adb15ca5e63d840e';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    const searchBox = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');

    async function checkWeather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        console.log(data);

        if (data.cod !== 200){
            console.log("Ville Introuvable.")
            return;
        }

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector('.weather-icon').src = "images/" + data.weather[0].main + ".png";
        document.querySelector('.humidity-img').src = "images/humidity.png";
        document.querySelector('.humidity-title').innerHTML = "Humidity";
        document.querySelector('.wind-title').innerHTML = "Wind Speed";
        document.querySelector('.wind-img').src = "images/wind.png";
        document.querySelector('.weather').style = "display :block;"
    }

    searchBtn.addEventListener("click", ()=>{
        if(searchBox.value.trim() === ""){
            return;
        }else{
            checkWeather(searchBox.value);
            searchBox.value = "";
        }
    })

    searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter"){
            if(searchBox.value.trim() === ""){
                return;
            }else{
                checkWeather(searchBox.value);
                searchBox.value = "";
            }
        }
    })
})
