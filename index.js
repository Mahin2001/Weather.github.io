const apikey = "0285a7b43ebc25f5ee4a0c0c9c0d3a93";

const weatherData = document.getElementById("Weather-data");

const cityInput = document.getElementById("city-input");

const form = document.querySelector("form");

form.addEventListener("submit", (event)=>{
event.preventDefault();

const cityValue = cityInput.value;
console.log(cityValue);

getWeatherData(cityValue);

})

async function getWeatherData(cityValue){

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();

        // console.log(data);

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const details = [
            `Feels like: ${Math.round(data.main.feel_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`,
        ]

        weatherData.querySelector(".temperature").textContent = `${temperature}℃`;

        weatherData.querySelector(".description").textContent = description;

        weatherData.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");
        
    } catch(error){


        weatherData.querySelector(".temperature").textContent = "";

        weatherData.querySelector(".description").textContent = "Ai desh ki apni toiri korsen? Thik naam den nahole dure giye moren";

        weatherData.querySelector(".details").innerHTML = "";
        
    }
}
