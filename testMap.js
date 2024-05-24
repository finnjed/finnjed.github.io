var mapOptions = {
 center: [49.9295, 8.1562], 
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
    "color": "#046582",
    "weight": 1,
    "opacity": 0.65
};

// weist den style zu 
L.geoJSON(buildings, {
    style: myStyle
}).addTo(map);

var myStyle2 = {
    "color": "#F39189",
    "weight": 0,
    "opacity": 0.4
};

L.geoJSON(bcKMLTest, {
    style: myStyle2
}).addTo(map);


//same aber mit style für kreise


L.geoJSON(buildings).addTo(map);


bcLibrary.bindPopup("<b>I'm the Boston College Library</b>");


function popUp(feature, layer) {
    var out = [];
		if (feature.properties){
		     out.push("The name of location is is: " + feature.properties.name);
		     out.push("The description of the location is:" + feature.properties.description);
		     out.push("Have a nice day!");
		}
		layer.bindPopup(out.join("<br />"));
}
