function errorLocalizaçao() {
    alert("Erro ao obter a localização");

}

let h2 = document.querySelector('#map');
var map;
var lati;
var long;
var objetoCoordenadas;

function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = "Sua possição no mapa";

    let long = pos.coords.longitude
    let lati = pos.coords.latitude



    document.getElementById("lati").innerHTML = lati  
    document.getElementById("long").innerHTML = long

    objetoCoordenadas = {
        lati: pos.coords.latitude,
        long: pos.coords.longitude
    }
    window.localStorage.setItem('coordenadas', 
    JSON.stringify(objetoCoordenadas));

    objetoCoordenadas = 
    JSON.parse(window.localStorage.getItem('coordenadas'));

    
    
    map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Você esta aqui!')
        .openPopup();

}


function error(err){
    console.log(err);
    console.log("Erro ao obter a localização");
    document.write("<body style='background-color: #21a928;'><h1 style='text-align: center;'>Verifique se seu despositivo esta permitindo o acesso da sua localização.</h1><br><a style='margin-left: 45%;' href='index.html'><span style='text-align: center;'>Voltar para a Home</span></a></body>")
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});


fetch("mapa.html")