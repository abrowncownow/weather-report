//Declare Variables/constants
const APIKey = "f64ce8261e64b0aec0696a661e821205"
const APIKey2 = "f4de48db09946ff80425ecc37245dbb1"
var city = "";
var lat;
var lon;
var units;
var exclude;
var data;
var current;
var data;
var forecast;
var saved;
var geocode = [];
var showFcast = false;
units = "imperial";
//End Variables/constants

//Declare Functions>
function convert(){
    var geocodeURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",usa&appid=" + APIKey;
    fetch(geocodeURL)
        .then((response)=>response.json())
        .then((data)=>{
            geocode=data[0];
            lat = geocode.lat;
            lon = geocode.lon;
            getWeather();
        })
        .catch((error)=>alert("Enter a valid City, State" + "\nError: " + error));
}

function getWeather(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=" + units; 
    fetch(queryURL)
        .then((response)=>response.json())
        .then((json)=>{
            data = json;
            displayCurrent();
            getForecast();
        })
        .catch((error)=>console.log("Error: " + error));
}
function getForecast(){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=" + units; 
    fetch(queryURL)
        .then((response)=>response.json())
        .then((json)=>{
            forecast = json.list;
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
$("#current-wind").text(current.wind + " mph");
$("#current-desc").text(current.desc);
$("#current-temp").text(current.temp + "°");
$("#current-humidity").text(current.humid+"%");
$("#city").text(current.name);
$("#current-icon").attr("src", "https://openweathermap.org/img/wn/" + current.icon + "@2x.png");
$("#current-weather").show();
}

function displayForecast(){
    if(showFcast){
        for (i=0;i<5;i++){
            $('#'+i).remove();}
    }
    forecast=[{
        desc: forecast[5].weather[0].description,
        temp: forecast[5].main.temp,
        wind: forecast[5].wind.speed,
        humid: forecast[5].main.humidity,
        icon: forecast[5].weather[0].icon,
        date: moment.unix(forecast[5].dt).format("dddd")
    },{
        desc: forecast[13].weather[0].description,
        temp: forecast[13].main.temp,
        wind: forecast[13].wind.speed,
        humid: forecast[13].main.humidity,
        icon: forecast[13].weather[0].icon,
        date: moment.unix(forecast[13].dt).format("dddd")
    },{
        desc: forecast[21].weather[0].description,
        temp: forecast[21].main.temp,
        wind: forecast[21].wind.speed,
        humid: forecast[21].main.humidity,
        icon: forecast[21].weather[0].icon,
        date: moment.unix(forecast[21].dt).format("dddd")
    },{
        desc: forecast[29].weather[0].description,
        temp: forecast[29].main.temp,
        wind: forecast[29].wind.speed,
        humid: forecast[29].main.humidity,
        icon: forecast[29].weather[0].icon,
        date: moment.unix(forecast[29].dt).format("dddd")
    },{
        desc: forecast[35].weather[0].description,
        temp: forecast[35].main.temp,
        wind: forecast[35].wind.speed,
        humid: forecast[35].main.humidity,
        icon: forecast[35].weather[0].icon,
        date: moment.unix(forecast[35].dt).format("dddd")
    }]
    for (i=0;i<5;i++){
        $('#days').append(`<tr id="` +i+`">
        <td><img src="https://openweathermap.org/img/wn/` + forecast[i].icon + `@2x.png"></td>
        <td>`+ forecast[i].date +`</td>
        <td>`+ forecast[i].temp + "°"+`</td>
        <td>`+ forecast[i].desc + `</td>
        <td>`+ forecast[i].humid + "%"+ `<td>
        </tr>`)}
    $("#5-day").show();
    showFcast = true;
}

function start(){
    if (saved){
        saved.push(city);
    }
    else{saved=[city];}
    $("#prev-list").append(`<li>` + city + `</li>`);
    localStorage.setItem("previous-search", JSON.stringify(saved));
    $("#city-search").val("");
    convert();
}

function init(){
    $("#current-weather").hide();
    $("#5-day").hide();
    saved = JSON.parse(localStorage.getItem("previous-search"));
    if (saved){
        for (i=0;i<saved.length; i++){
            $('#prev-list').append(`<li>` + saved[i] + `</li>`);
        }
    }

}
//End Functions Declaration

//Initialize
init();
//

//listeners
$(document).on('keypress',function(e) {
    if((e.which == 13)&&($('#city-search').val)) {
        e.preventDefault();
        city = $("#city-search").val();
        start();
    }
});
$("#search-btn").click(function(event){
    event.preventDefault();
    city = $("#city-search").val();
    start();
});
$('li').click(function(event){
    event.preventDefault();
    city=$(this).text();
    start();
})
//End listeners