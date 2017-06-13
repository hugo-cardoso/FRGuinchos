$(document).ready(function(){
  $('.slides').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000
  });
});


$(".hamburger, aside a").click(function(){

  var elm = $(".hamburger i");
  var classe = elm.attr("class");

  if(classe === "fa fa-bars"){
    $(elm).attr("class", "fa fa-times");
  }else {
    $(elm).attr("class", "fa fa-bars");
  }

  $("aside").toggleClass("active");

});

// Maps

var itaquera = {
  lat: "-23.5397307",
  long: "-46.4480022"
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  aqui = {
    lat: position.coords.latitude,
    long: position.coords.longitude
  };
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km

  getPriceKm(d);

}

function getPriceKm(km){

  var distante = parseInt(km);
  var price = 120 + (2 * distante);

  console.log("Preço: R$" + price)
  $("#price").html(price);

}

$("#orcar").click(function(){

  var geocoder = new google.maps.Geocoder();
  var destino = document.getElementById("destino").value;
  var destino = destino.replace(" ","%");

  $.get( "https://maps.googleapis.com/maps/api/geocode/json?address=" + destino + "&key=AIzaSyAgXBzHEtFvOvuuBktjuCH8r_e1_CC6LHU", function( data ) {
    console.log(data);
    $("#destino").val(data.results[0].formatted_address);
    destinoCoord = data.results[0].geometry.location;
    getDistanceFromLatLonInKm(aqui.lat,aqui.long,destinoCoord.lat,destinoCoord.lng);
  });

});

$(".centerMap").click(function(){

  getLocation();

})

getLocation();
