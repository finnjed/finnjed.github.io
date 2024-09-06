var mapOptions = {
 center: [48.2203, 16.3799], 
 zoom: 16 ,
 maxZoom : 24, 
 }

var map = new L.map('map', mapOptions);

var Esri_WorldImagery = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; <a href=\\\"https://www.openstreetmap.org/copyright\\\">OpenStreetMap</a> contributors"}).addTo(map);

var bcLibrary= L.marker( [42.336004, -71.169212] ).addTo(map);



L.geoJSON(bcKMLTest, {
    pointToLayer: function (feature, latlng) {
        return L.circle(latlng, 500);
    }
}).addTo(map);

// fügt den style hinzu
var myStyle = {
    "color": "#FFBC42",
    "weight": 10,
    "opacity": 0.65
};

// weist den style zu 
L.geoJSON(buildings, {
    style: myStyle
}).addTo(map);

//same aber mit style für kreise

L.geoJSON(buildings).addTo(map);

