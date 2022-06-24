//Bien mettre ce script.js en dessous du leaflet.js dans weather.ejs

//Leaflet doc -> Setup map
var map = L.map('mapid').setView([45, 0], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


//Chercher longitude et latitude depuis: data-lon & data-lat, dans weather.ejs
var cities = document.getElementsByClassName('list-group-item')
    // console.log(cities);

    //Sur Leaflet documentation :
var myIcon = L.icon({
    iconUrl: './images/leaf-green.png',
    iconSize: [20, 50],
    iconAnchor: [10, 50],
    popupAnchor: [-3, -76],
    shadowUrl: './images/leaf-shadow.png',
    shadowSize: [40, 40],
    shadowAnchor: [2, 40]
});

for(var i=0; i<cities.length; i++) {
    // console.log(cities[i]);
    // console.log(cities[i].dataset.lon);
    var lon = cities[i].dataset.lon;
    var lat = cities[i].dataset.lat;
    var citynamePopup = cities[i].dataset.cityname;
    // console.log(citynamePopup);
    
    //Sur Leaflet documentation :
    // L.marker([lat, lon]).addTo(map).bindPopup(citynamePopup);
    L.marker([lat, lon], {icon: myIcon}).addTo(map).bindPopup(citynamePopup);
}


