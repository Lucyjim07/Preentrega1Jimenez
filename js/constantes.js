// constantes
const LISTA_VIAJES = "viajes";
const MI_VIAJE = "miViaje";

let viajes = [];

const cargarViajes = async () => {
    const respuesta = await fetch("json/viajes.json");
    const data = await respuesta.json();
    viajes.push(...data);
}
cargarViajes();

// Guardar viajes en localStorage
if(localStorage.getItem(LISTA_VIAJES)){
    viajes = JSON.parse(localStorage.getItem(LISTA_VIAJES))
} else {
    localStorage.setItem(LISTA_VIAJES, JSON.stringify(viajes));
}

let cupones = [];

const cuponValido = async () => {
    const respuesta = await fetch("json/cupones.json");
    const data = await respuesta.json();
    cupones.push(...data);
}
cuponValido();
