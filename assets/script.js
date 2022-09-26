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
        .catch((error)=>alert("Enter a valid City, State" + "\nError: " + error));
}

function getWeather(){
    var queryURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alert&appid=" + APIKey2 + "&units=" + units; 
    fetch(queryURL)
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json);
            data = json;
            displayCurrent();
            displayForecast();
        })
        .catch((error)=>console.log("Error: " + error));
}

function displayCurrent(){
current ={
    desc: data.current.weather[0].description,
    temp: data.current.temp,
    wind: data.current.wind_speed,
    humid: data.current.humidity,
    name: data.name,
    icon: data.weather[0].icon,
    date: moment.unix(data.current.dt).format("dddd MMM, Do YYYY hh"),
}
$("#current-date").text(current.date);
$("#current-desc").text(current.desc);
$("#current-temp").text(current.temp + "°");
$("#current-humidity").text(current.humid+"%");
$("#city").text(current.name);
$("#current-icon").attr("src", "http://openweathermap.org/img/wn/" + current.icon + "@2x.png");
$("#current-weather").show();


}

function displayForecast(){
    forecast=[{
        desc: data.daily[0].weather[0].description,
        temp: data.daily[0].temp.day,
        wind: data.daily[0].wind_speed,
        humid: data.daily[0].humidity,
        icon: data.daily[0].weather[0].icon,
        date: moment.unix(data.daily[0].dt).format("dddd")
    },{
        desc: data.daily[1].weather[0].description,
        temp: data.daily[1].temp.day,
        wind: data.daily[1].wind_speed,
        humid: data.daily[1].humidity,
        icon: data.daily[1].weather[0].icon,
        date: moment.unix(data.daily[1].dt).format("dddd")
    },{
        desc: data.daily[2].weather[0].description,
        temp: data.daily[2].temp.day,
        wind: data.daily[2].wind_speed,
        humid: data.daily[2].humidity,
        icon: data.daily[2].weather[0].icon,
        date: moment.unix(data.daily[2].dt).format("dddd")
    },{
        desc: data.daily[3].weather[0].description,
        temp: data.daily[3].temp.day,
        wind: data.daily[3].wind_speed,
        humid: data.daily[3].humidity,
        icon: data.daily[3].weather[0].icon,
        date: moment.unix(data.daily[3].dt).format("dddd")
    },{
        desc: data.daily[4].weather[0].description,
        temp: data.daily[4].temp.day,
        wind: data.daily[4].wind_speed,
        humid: data.daily[4].humidity,
        icon: data.daily[4].weather[0].icon,
        date: moment.unix(data.daily[4].dt).format("dddd")
    }]
    console.log(forecast);
    for (i=0;i<5;i++){
    $('#days').append(`<tr>
    <td><img src="http://openweathermap.org/img/wn/` + forecast[i].icon + `@2x.png"></td>
    <td>`+ forecast[i].date +`</td>
    <td>`+ forecast[i].temp + "°"+`</td>
    <td>`+ forecast[i].desc + `</td>
    <td>`+ forecast[i].humid + "%"+ `<td>
    </tr>`)}
}

function start(){
    if (saved){saved.push(city);}
    else{saved=[city];}
    console.log(saved);
    $("#prev-list").append(`<li>` + city + `</li>`);
    localStorage.setItem("previous-search", JSON.stringify(saved));
    $("#city-search").val("");
    convert();
}

function init(){
    $("#current-weather").hide();
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