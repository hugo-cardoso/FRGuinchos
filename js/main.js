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

$(".menu-icon, .aside-bg").click(function(){

  $(".aside-bg").toggleClass("active");
  $("aside").toggleClass("active");

});

function createMessage(msg){

  var elm = $(".message");

  $(elm).addClass("active").promise().done(function(){
    $(elm).html(msg);
    setTimeout(function(){
      $(elm).removeClass("active");
    }, 5000);
  });

}

// Maps

$(".adress_input input").keyup(function(){

  var retirada = $("#retirada").val();
  var destino = $("#destino").val();

  if(retirada.length > 0 && destino.length > 0){
    $(".calc").show();
  } else {
    $(".calc").hide();
  }

});

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){

      aqui = {
        lat: Number(position.coords.latitude),
        lng: Number(position.coords.longitude)
      };
      center(aqui.lat,aqui.lng);

    }, function(){

      createMessage("Seu GPS está desligado.");

      aqui = {
        lat: Number(-23.5521281),
        lng: Number(-46.6353305)
      };
      center(aqui.lat,aqui.lng);

    });
  } else {

    console.log("Teste");

  }

  console.log(navigator.geolocation);

}

function center(lat,lng) {

  getAdress(lat,lng);
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'roadmap',
    zoom: 17,
    center: new google.maps.LatLng(parseFloat(lat + 0.00069),parseFloat(lng)),
    zoomControl: false,
    scaleControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: [
    {
      featureType: 'poi',
      stylers: [
      { visibility: "off" }
      ]
    }
    ]
  });
  marker = new google.maps.Marker({
    position: aqui,
    map: map,
    id: 'markerAqui',
    icon: {
      'url':'img/Pin.png',
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(25, 50)
    }
  });

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  google.maps.event.addListenerOnce(map, 'idle', function(){
    $(".mapLoading").hide(function(){
      $("#map").show();
    });
  });

}

function centerMap(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){

      marker.setMap(null);
      getLocation();
      var latLng = marker.getPosition();
      offsetCenter(latLng,0,0.2);

    }, function(){

      createMessage("Por favor, ligue o GPS.");

    });
  }  
  
}

function offsetCenter(latlng, offsetX, offsetY) {

  var center = latlng;

  var span = map.getBounds().toSpan();

  var newCenter = {
    lat: center.lat() + span.lat()*offsetY,
    lng: center.lng() + span.lng()*offsetX
  };

  console.log(newCenter);

  map.panTo(newCenter);

}

$("#centerMap").click(function(){
  centerMap();
});

function getAdress(lat,lng){

  $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false", function( data ) {
    $("#retirada").val(data.results[0].formatted_address);
    return data.results[0].formatted_address;
  });

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
  var d = parseInt(d);

  console.log(d);
  return d;

}

function getPriceKm(km){

  var distante = parseInt(km  / 1000);
  var price = 120 + (2 * distante);
  var price = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  console.log("Preço: R$" + price)
  $("#price").html(price);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {

  marker['markerAqui'];
  marker.setMap(null);

  var destino = document.getElementById("destino").value;
  var retirada = document.getElementById("retirada").value;

  directionsService.route({
    origin: "itaquera",
    destination: destino,
    travelMode: 'DRIVING',
    waypoints: [
    {
      location: new google.maps.LatLng(parseFloat(aqui.lat),parseFloat(aqui.lng))
    }
    ]
  }, function(response, status) {

    if (status === 'OK') {
      console.log(response);
      directionsDisplay.setDirections(response);

      var totalKm = 0;
      var totalTime = 0;

      for (var i = 0; i < response.routes[0].legs.length; i++) {

        totalKm += response.routes[0].legs[i].distance.value;
        totalTime += response.routes[0].legs[i].duration.value;

      }

      console.log(totalKm);

      getPriceKm(totalKm);

      $("#distance").html(parseInt(totalKm / 1000) + "Km");

      $("#centerMap").toggleClass("disabled");

      $(".calc").hide();

      var whatsappLink = "https://api.whatsapp.com/send?phone=5511953977813&text="
      var whatsappMsg = "*Preciso de um guincho!* "+"\r\n\r\n" + "*Origem*: " + retirada + "\r\n\r\n*Destino*: " + destino;
      whatsappMsg = window.encodeURIComponent(whatsappMsg);

      $(".whatsapp").attr("href", whatsappLink + whatsappMsg);

      $(".msgWaiting").hide(function(){
        $(".orcamento").show();
      })

    }


  });
}

$("#orcar").click(function(){

  var geocoder = new google.maps.Geocoder();
  var destino = document.getElementById("destino").value;
  var retirada = document.getElementById("retirada").value;

  $.get( "https://maps.googleapis.com/maps/api/geocode/json?address=" + retirada + "&key=AIzaSyAgXBzHEtFvOvuuBktjuCH8r_e1_CC6LHU", function( data ) {

    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;

    aqui = {lat: lat, lng: lng};

    $.get( "https://maps.googleapis.com/maps/api/geocode/json?address=" + destino + "&key=AIzaSyAgXBzHEtFvOvuuBktjuCH8r_e1_CC6LHU", function( data2 ) {

      $("#destino").val(data2.results[0].formatted_address);

      for (var i = 0; i < data2.results[0].address_components.length; i++) {

        if(data2.results[0].address_components[i].short_name === "SP") {
          fretesp = true;
        } else {
          fretesp = false;
        }

      }

      if(fretesp === true) {

        fretesp = false;
        destinoCoord = data2.results[0].geometry.location;
        calculateAndDisplayRoute(directionsService, directionsDisplay);

      } else {

        createMessage("Fretes apenas para São Paulo.");

      }

    });

  });

});

$(".centerMap").click(function(){

  getLocation();

})

// AutoComplete

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('retirada')),
    {types: ['geocode']});

  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('destino')),
    {types: ['geocode']});

}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

$(function(){
  $(window).load(function(){

    getLocation();
    initAutocomplete();


  });
});
