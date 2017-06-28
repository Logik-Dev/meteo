var temp;
var unit = "celcius";

function getCity(position) {
  console.log(position);
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  $.get(
    "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      lat +
      "," +
      lon,
    showCity
  );
  $.get(
    "http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=98e7eb2cd4bab5e4687cc52c0ff35a03&lang=fr&lat=" +
      lat +
      "&lon=" +
      lon,
    showWeather
  );
}
function changeUnit() {
  if (unit === "celcius") {
    unit = "farenheit";
    temp = temp * 1.8 + 32;
    $("#temperature").text(Math.round(temp, 2));
    $(".btn").text(unit);
  } else {
    unit = "celcius";
    temp = (temp - 32) / 1.8;
    $("#temperature").text(Math.round(temp, 2));
    $(".btn").text(unit);
  }
}
function showCity(data) {
  console.log(data);
  var city = data.results[0]["address_components"][2]["long_name"];
  $("#city").text(city);
}
function showWeather(data) {
  var icon = data.weather[0].icon;
  var description = data.weather[0].description;
  temp = data.main.temp;
  $("#icon").html(
    "<img height=120 width=120 src='http://openweathermap.org/img/w/" +
      icon +
      ".png'></img>"
  );
  $("#description").text(description);
  $("#temperature").text(Math.round(temp, 2));
  $(".btn").text(unit);
  $(".btn").click(changeUnit);
}
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCity, function(err) {
      console.log(err);
    });
  }
});
