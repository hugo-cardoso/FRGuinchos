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

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {

    $(".aside-bg").removeClass("active");
    $("aside").removeClass("active");

    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
      ) {
      // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
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

$(".adress_input input#retirada").focus(function(){
  $("#centerMap").removeClass("disabled");
});

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position){

//       aqui = {
//         lat: Number(position.coords.latitude),
//         lng: Number(position.coords.longitude)
//       };
//       center(aqui.lat,aqui.lng);

//     }, function(){

//       createMessage("Seu GPS está desligado.");

//       aqui = {
//         lat: Number(-23.5521281),
//         lng: Number(-46.6353305)
//       };
//       center(aqui.lat,aqui.lng);

//     });
//   } else {

//     console.log("Teste");

//   }

//   console.log(navigator.geolocation);

// }

function onSuccess(position){

  console.log(position);
  aqui = {
    lat: Number(position.coords.latitude),
    lng: Number(position.coords.longitude)
  };
  center(aqui.lat,aqui.lng);

}

function onError(position){

  createMessage("Seu GPS está desligado.");

  aqui = {
    lat: Number(-23.5521281),
    lng: Number(-46.6353305)
  };
  center(aqui.lat,aqui.lng);

}

function onProgress(position){
  console.log(position)
}

function getLocation() {
    var output = document.getElementById("retirada");  // the div where messages will appear
    var options = {
      desiredAccuracy:20,
      maxWait: 5000
    };
    
    if (navigator.geolocation){

      navigator.geolocation.getAccurateCurrentPosition(onSuccess, onError, onProgress, options);

    }

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
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
        {
          "color": "#7c93a3"
        },
        {
          "lightness": "-10"
        }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "color": "#a0a4a5"
        }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "color": "#62838e"
        }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "simplified"
        }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
        {
          "visibility": "on"
        },
        {
          "hue": "#ff0000"
        }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
        {
          "color": "#dde3e3"
        },
        {
          "weight": "0.01"
        }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "visibility": "off"
        },
        {
          "hue": "#00ff63"
        },
        {
          "weight": "1.17"
        }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "color": "#3f4a51"
        },
        {
          "weight": "0.30"
        }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "simplified"
        }
        ]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
        {
          "saturation": "-100"
        },
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
        {
          "color": "#bbcacf"
        }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "lightness": "0"
        },
        {
          "color": "#bbcacf"
        },
        {
          "weight": "0.50"
        }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
        {
          "color": "#ffffff"
        }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
        {
          "color": "#a9b4b8"
        }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
        {
          "invert_lightness": true
        },
        {
          "saturation": "-7"
        },
        {
          "lightness": "3"
        },
        {
          "gamma": "1.80"
        },
        {
          "weight": "0.01"
        }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "on"
        }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
        {
          "color": "#a3c7df"
        }
        ]
      }
      ]});
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
