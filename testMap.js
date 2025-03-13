//map settings

var mapOptions = {
 center: [49.982865, 7.967067], 
 zoom: 17,
 maxZoom : 18, 
 }

var map = new L.map('map', mapOptions);

var Esri_WorldImagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"&copy; <a href=\\\"https://www.openstreetmap.org/copyright\\\">OpenStreetMap</a> contributors"}).addTo(map);



// L.geoJSON(bcKMLTest, {
//     pointToLayer: function (feature, latlng) {
//         return L.circle(latlng, 500);
//     }
// }).addTo(map);

//with the external js holding your data, only this line of code needs to be added to add your data to the map
L.geoJSON(bcKMLTest, {
    onEachFeature: popUp
}).addTo(map);


function popUp(feature, layer) {
    var out = [];
		if (feature.properties){
             //out.push("Have a nice day!");
		     out.push("Vorschlag: " + feature.properties.sug);
		     out.push("Zustimmungen:" + feature.properties.likes);
		}
		layer.bindPopup(out.join("<br />"));
}

// // fügt den style hinzu
// var myStyle = {
//     "color": "#FFBC42",
//     "weight": 10,
//     "opacity": 0.65
// };

// weist den style zu 
// L.geoJSON(buildings, {
//     style: myStyle
// }).addTo(map);

//same aber mit style für kreise

// L.geoJSON(buildings).addTo(map);



