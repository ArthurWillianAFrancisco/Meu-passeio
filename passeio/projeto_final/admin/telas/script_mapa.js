function errorLocalizaçao() {
    console.log("Ero ao obter a localização")
}


var map;

function success(){

    
    objetoCoordenadas = 
    JSON.parse(window.localStorage.getItem('coordenadas'));
    
    
    document.getElementById("lati").innerHTML = objetoCoordenadas.lati;
    document.getElementById("long").innerHTML = objetoCoordenadas.long;
    const lat = parseFloat(objetoCoordenadas.lati)
    const lon = parseFloat(objetoCoordenadas.long)
    
    
    map = L.map('mapid').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map) 
        .bindPopup('Eu estou aqui!')
        .openPopup();
}

function error(err){
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});