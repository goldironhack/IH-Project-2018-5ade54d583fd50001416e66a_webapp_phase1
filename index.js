const GOOGLE_KEY = "AIzaSyCNMkxhK5vwLLb8yg2L3JbvRgdNZMVtEAI";

var map;
var ny = {lat:40.730610, lng:-73.935242}
var broo = {lat: 40.650002, lng:-73.949997}
var nyMarker;
var brMarker;
var directionsService;
var directionsRenderer;

// Define the LatLng coordinates for the polygon's path.
        var triangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 25.774, lng: -80.190}
        ];

function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 10,
         center: ny
       });
       nyMarker = new google.maps.Marker({
         position: ny,
         map: map
       });
       brMarker = new google.maps.Marker({
         position: broo,
         map: map
       });
       directionsService = new google.maps.DirectionsService();
       directionsRenderer = new google.maps.DirectionsRenderer();
       events_marker(brMarker);
      drawPolygon();
     }

function getRoute(marker){
  var originPoint = nyMarker.position;
  var request = {
    origin:originPoint,
    destination: brMarker.position,
    travelMode: 'DRIVING'
  };

  directionsRenderer.setMap(map);
  directionsService.route(request,function(result,status){
    if(status=='OK'){
      directionsRenderer.setDirections(result);
    }
  })
}

function events_marker(marker){
  if(!(typeof marker === "undefined")){
    marker.addListener('click',function(){
      getRoute(marker);
    });
  }
}

function drawPolygon(){
  // Construct the polygon.
        var bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map);
      }