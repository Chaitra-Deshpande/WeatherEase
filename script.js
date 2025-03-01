const apiKey="6b8f30ad65fd5a2d32eb055b2566f086";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput=document.querySelector(".city-input");
const searchBtn=document.querySelector(".search-btn");

const currentDateTxt=document.querySelector('.current-date');

const weatherIcon=document.querySelector(".weather-summary-img");

const weatherInfoSection=document.querySelector(".weather-info");
const searchCitySection=document.querySelector(".search-city");

searchBtn.addEventListener('click',()=>{
    if(cityInput.value.trim()!=''){
        checkWeather(cityInput.value);
        cityInput.value='';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown',(event)=>{
    if(event.key=='Enter' && cityInput.value.trim()!=''){
        checkWeather(cityInput.value);
        cityInput.value='';
        cityInput.blur();
    }
})
function getCurrentDate(){
    const currentDate= new Date();
    const options={
        weekday:'short',
        day:'2-digit',
        month:'short',

    }
    return currentDate.toLocaleDateString('en-GB',options);
}
currentDateTxt.textContent=getCurrentDate();

async function checkWeather(city) {
    const response=await fetch(apiUrl+ city+ `&appid=${apiKey}`);
    let data=await response.json();

    document.querySelector(".city-name").innerHTML=data.name;
    document.querySelector(".temp-txt").innerHTML=Math.round(data.main.temp)+"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+" kmph";
    document.querySelector(".condition-txt").innerHTML=data.weather[0].main;

    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/cloudy.svg";
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear-sunny1.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rainy.webp";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main=="Haze"){
        weatherIcon.src="images/haze.png";
    }
    else if(data.weather[0].main=="Snow"){
        weatherIcon.src="images/snow1.png";
    } 

  
    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section){
    [weatherInfoSection,searchCitySection].forEach(section => section.style.display="none");

    section.style.display='flex';
    section.style.flexDirection='column';
}

searchBtn.addEventListener("click",()=>{
    checkWeather(cityInput.value);

})


