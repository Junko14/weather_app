
// console.log( 'asdf' );
// function showInfo(event){
//     console.log(event);
// }

function getWeather(){
    const apiKey = '3ebf54695594b93500d61d3afe777079';
    const city = document.getElementById('city').value;
    if (!city){
        alert('Please enter a city');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // 現在の天気を取得するfetchリクエスト
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data =>{
            displayWeather(data);
        })
        .catch(error =>{
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // 週間の天気予報を取得するfetchリクエスト
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data =>{
            displayHourlyForecast(data.list); // 毎時の天気予報を表示
        })
        .catch(error =>{
            console.error('Error fetching hourly weather data:', error);
            alert('Error fetching hourly weather data. Please try again.');
        });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // 前回のコンテンツをクリアする
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
    // 次の24時間の天気予報を表示する
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}












// function getWeather(){
//     const apiKey = '3ebf54695594b93500d61d3afe777079';
//     const city = document.getElementById('city').value;
//     if (!city){
//         alert('Please enter a city');
//         return;
//     }
//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


// // function getWeather(){

//     fetch(currentWeatherUrl)
//         .then(response => response.json())
//         .then(data =>{
//             displayWeather(data);
//         })
//         .catch(error =>{
//             console.error('Error fetching current weather data:', error);
//                 alert('Error fetching current weather data. Please try again.');
//         });
        

// // function getWeather(){

//     fetch(currentWeatherUrl)
//         .then(response => response.json())
//         .then(data =>{
//             displayHourlyForecast(data.list);
//         })
//         .catch(error =>{
//             console.error('Error fetching current weather data:', error);
//                 alert('Error fetching hourly weather data. Please try again.');
//         });
//     }

// function displayWeather(data){
//     const tempDivInfo = document.getElementById('temp-div');
//     const weatherInfoDiv = document.getElementById('weather-info');
//     const weatherIcon = document.getElementById('weather-icon');
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');

//     // clear previous content
//     weatherInfoDiv.innerHTML = '';
//     hourlyForecastDiv.innerHTML = '';
//     tempDivInfo.innerHTML = '';
// }
// function displayWeather(data){
//     if (data.cod === '404'){
//         weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//     }else{
//         const cityName = data.name;
//         const temperature = Math.round(data.main.temp - 273.15);
//         const description = data.weather[0].description;
//         const iconCode = data.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//         const temperatureHTML = `<p>${temperature}°C</p>`;
//         const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

//         tempDivInfo.innerHTML = temperatureHTML;
//         weatherInfoDiv.innerHTML = weatherHTML;
//         weatherIcon.src = iconUrl;
//         weatherIcon.alt = description;

//         showImage();
//     }
// }
// // for week
// function displayHourlyForecast(hourlyData){
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');
//     const next24Hours = hourlyData.slice(0,8);

//     next24Hours.forEach(item => {

//         const dateTime = new Date(item.dt * 1000);
//         const hour = dateTime.getHours();
//         const temparature = Math.round(item.main.temp - 273.15);
//         const iconCode = item.weather[0].icon;
//         const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

//         const hourlyItemHtml = `
//         <div class="hourly-item">
//             <span>${hour}:00</span>
//             <img src="${iconUrl}" alt="Hourly Weather Icon">
//             <span>${temparature}°C</span>
//         </div>
//         `;
//         hourlyForecastDiv.innerHTML += hourlyItemHtml;
//     });
// }



// function showImage(){
//     const weatherIcon = document.getElementById('weather-icon');
//     weatherIcon.style.display = 'block';
// }



// // Get an element with the id "Toronto"
// const element = document.getElementById("Toronto");


// function toggleDropdown() {
//     var dropdownList = document.getElementById("dropdown-list");
//     dropdownList.style.display = (dropdownList.style.display === 'none' || dropdownList.style.display === '') ? 'block' : 'none';
// }

// function selectCity(city) {
//     // toggleDropdown(); // dropdaenmenu-- display none
//     showInfo(city); // display city weather selected
//     // toggleDropdown(); // dropdownmenu-- display none again
// }
// function hideWeatherInfo(){
//     const content = document.querySelector('#weather-info');
//     content.innerHTML = '';
// }

// // async/await
// async function getData( city ) {
//     try {
//         const foobar = await fetch( `http://api.weatherapi.com/v1/current.json?key=29a43923498e423e92d183223230102&q=${city}` );
//         const data = await foobar.json();

//         console.log( data );
//         console.log( data.current.temp_c );

//         const content = document.querySelector( '#weather-info' );
//         content.innerHTML = `
        
//             <p>${data.location.name}, ${data.location.country},${data.location.tz_id},</p>
//             <p>${data.current.temp_c} ℃</p>
//             <p><img src="${data.current.condition.icon}" alt="${data.current.condition.text}" /> ${data.current.condition.text}</p>

//         `;
//     } catch( error ) {
//         // console.warn( "Nope: " + error );
//         console.warn( `Nope: ${error}` );
//     }
// }
// // Setup for eventListener
// document.querySelector('.select-city-btn').addEventListener('click', () => {
//     hideWeatherInfo();
//     toggleDropdown(); // doropdownmenu -- diaplay none
// });


// document.getElementById("Toronto").addEventListener("click", (event) => {
//     showInfo(event);
//     getData('Toronto');
//     toggleDropdown();
// });

// document.getElementById("London").addEventListener("click", (event) => {
//     showInfo(event);
//     getData('London');
//     toggleDropdown();
// });

// document.getElementById("Tokyo").addEventListener("click", (event) => {
//     showInfo(event);
//     getData('Tokyo');
//     toggleDropdown();
// });
// document.getElementById("Lagos").addEventListener("click", (event) => {
//     showInfo(event);
//     getData('Lagos');
//     toggleDropdown();
// });
// document.getElementById("Los_Angeles").addEventListener("click", (event) => {
//     showInfo(event);
//     getData('Los Angeles');
//     toggleDropdown();
// });
