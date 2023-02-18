// constantes
const LISTA_VIAJES = "viajes";
const MI_VIAJE = "miViaje";

// Instanciación de objetos
const viaje1 = new Viaje(1, "Cartagena", 2, 1, 3);
const viaje2 = new Viaje(2, "Cali", 3, 2, 3);
const viaje3 = new Viaje(3, "Santa Marta", 4, 0, 4);
const viaje4 = new Viaje(4, "Medellin", 4, 1, 4);

// Crear un areglo de objetos tipo viaje
let viajes = [viaje1, viaje2, viaje3, viaje4];

// Guardar viajes en localStorage
if(localStorage.getItem(LISTA_VIAJES)){
    viajes = JSON.parse(localStorage.getItem(LISTA_VIAJES))
} else {
    localStorage.setItem(LISTA_VIAJES, JSON.stringify(viajes));
}