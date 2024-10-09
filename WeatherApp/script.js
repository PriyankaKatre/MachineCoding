document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector("#cityInput");
    const searchButton = document.querySelector("#searchButton");
    const weatherInfo = document.querySelector("#weatherInfo");
    const cityName = document.querySelector("#cityName");
    const errorMessage = document.querySelector("#errorMessage");
    const temp = document.querySelector("#temp");
    const weatherText = document.querySelector("#weather");
    const apiKey = 'b729c5ac7ddfe70e6d7b9e8f3c82cd03';
    const city = 'london'

    //url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    //console.log(url)

    searchButton.addEventListener('click', async() => {
        let city = cityInput.value.trim();
        if (!city) return;
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData)
        }
        catch (e) {
            showError()
        }

    })

    const fetchWeatherData = async (city) => {
        let res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!res.ok) {
            throw new Error("City Not Found")
        }

        let data = await res.json();
        return data;
    }

    const displayWeatherData = (weatherData) => {
        const { name, main, weather } = weatherData;
        console.log(main, weather);
        cityName.textContent = name;
        temp.textContent = `Temperature ${main.temp}`;
        weatherText.textContent = `weather : ${weather[0].description}`;
        weatherInfo.classList.remove('hidden');
    }
    const showError = () => {
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})
