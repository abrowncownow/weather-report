//Declare Variables/constants
const APIKey = "f64ce8261e64b0aec0696a661e821205"
var city;
var lat;
var lon;
var units;
var exclude;
var data;
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
        })
        .catch((error)=>console.log("Error: " + error));
}
//End Functions Declaration

//Listeners
$("#search-btn").click(function(event){
    event.preventDefault();
    city = $("#city-search").val();
    console.log(city)
    $("#city-search").text("");
    convert();
})
//End Listeners