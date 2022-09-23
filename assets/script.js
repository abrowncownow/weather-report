//Declare Variables/constants
const APIKey = "f64ce8261e64b0aec0696a661e821205"
var city;
var lat;
var lon;
var units;
var exclude;
var data;
var current;
var forecastData;
var forecast;
var geocode = [];
units = "imperial";
//End Variables/constants

//Declare Functions>
function convert(){
    var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ",usa&appid=" + APIKey;
    fetch(geocodeURL)
        .then((response)=>response.json())
        .then((data)=>{
            geocode=data[0];
            lat = geocode.lat;
            lon = geocode.lon;
            console.log(lat);
            console.log(lon);
            getWeather();
        })
        .catch((error)=>console.log("Error: " + error));
}

function getWeather(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=" + units; 
    fetch(queryURL)
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json);
            data = json;
            displayCurrent();
            getForecast();
        })
        .catch((error)=>console.log("Error: " + error));
}

function getForecast(){
    var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid=" + APIKey + "&units=" + units; 
    fetch(forecastURL)
        .then((response)=>response.json())
        .then((fcast)=>{
            console.log(fcast);
            forecastData = fcast;
            displayForecast();
        })
        .catch((error)=>console.log("Error: " + error));
}

function displayCurrent(){
current ={
    desc: data.weather[0].description,
    temp: data.main.temp,
    wind: data.wind.speed,
    humid: data.main.humidity,
    name: data.name,
    icon: data.weather[0].icon,
    date: moment.unix(data.dt).format("dddd MMM, Do YYYY"),
}
$("#current-date").text(current.date);
$("#current-desc").text(current.desc);
$("#current-temp").text(current.temp);
$("#current-humidity").text(current.humid);
$("#city").text(current.name);
$("#current-icon").attr("src", "http://openweathermap.org/img/wn/" + current.icon + "@2x.png");
$("#current-weather").show();
}

function displayForecast(){
    forecast=[{
        desc: forecastData.list[0].weather[0].description,
        temp: forecastData.list[0].main.temp,
        wind: forecastData.list[0].wind.speed,
        humid: forecastData.list[0].main.humidity,
        name: forecastData.list[0].name,
        icon: forecastData.list[0].weather[0].icon,
        date: forecastData.list[0].dt,
    },{
        desc: forecastData.list[1].weather[0].description,
        temp: forecastData.list[1].main.temp,
        wind: forecastData.list[1].wind.speed,
        humid: forecastData.list[1].main.humidity,
        name: forecastData.list[1].name,
        icon: forecastData.list[1].weather[0].icon,
        date: forecastData.list[1].dt,
    }


    ]
}
function init(){
    $("#current-weather").hide();
}
//End Functions Declaration

//Initialize
init();
//

//Listeners
$("#search-btn").click(function(event){
    event.preventDefault();
    city = $("#city-search").val();
    console.log(city)
    $("#city-search").text("");
    convert();
})
//End Listeners