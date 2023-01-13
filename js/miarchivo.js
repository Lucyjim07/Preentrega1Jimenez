let quieresViajar = prompt("pensando en viajar si o no");

if (quieresViajar == "si") {
    siViajar();
} else {
    finalizar();
}

class Viaje {
    constructor(destino, adultos, ninios, dias) {
        (this.destino = destino),
            (this.adultos = adultos),
            (this.ninios = ninios),
            (this.dias = dias);
    }

    mostrarInformacionDeViaje() {
        console.log(
            `datos capturados: destino/${this.destino}} adultos/${this.adultos} niños/${this.ninios} días/${this.dias}`
        );
    }

    calcularValorViaje() {
        let valor = 0;
        switch (this.destino) {
            case "1":
                valor =
                    (this.adultos * 1000000 + this.ninios * 500000) * this.dias;
                break;
            case "2":
                valor =
                    (this.adultos * 1000000 + this.ninios * 500000) * this.dias;
                break;
            default:
                console.log("Opcion no Valida");
                break;
        }
        console.log(`Su viaje cuesta: ${valor}`);
    }

    calcularPlanDePago(cuotas) {}
}

function siViajar() {
    // console.log("Busquemos tu destino");
    // alert("Busquemos tu destino");
    mostrarMenu();
}

function finalizar() {
    console.log("Vuelve pronto");
    alert("Vuelva pronto");
}

function capturarDatosDelViaje() {
    // agregar destinos nacionales e internacionales con un menú
    let destino = prompt(`Ingresa tu destino
        1. Cartagena 
        2. Cali
        3. Medellin
        4. Santa Marta`);
    let cantidadDeAdultos = parseInt(prompt("Cuantas adultos piensan viajar"));
    let cantidadDeNinios = parseInt(prompt("Cuantas niños piensan viajar"));
    let cantidadDeDias = parseInt(prompt("Cuantos días piensas viajar"));

    const miViaje = new Viaje(
        destino,
        cantidadDeAdultos,
        cantidadDeNinios,
        cantidadDeDias
    );
    return miViaje;
    // mostrarDatosDeViaje(destino, cantidadDeAdultos, cantidadDeNinios, cantidadDeDias);
}

// function mostrarDatosDeViaje(destino, cantidadDeAdultos, cantidadDeNinios, cantidadDeDias){
//     console.log(`datos capturados: destino/${destino} adultos/${cantidadDeAdultos} niños/${cantidadDeNinios} días/${cantidadDeDias}`);
// }

function mostrarMenu() {
    let mostrarMenu = true;
    let viajeCapturado;
    do {
        let opcionMenu = prompt(`Ingrese la opción deseada
        1 - Crea tu viaje
        2 - Resumen del viaje
        3 - Plan de pago
        0 - Salir del menu`);
        switch (opcionMenu) {
            case "1":
                viajeCapturado = capturarDatosDelViaje();
                break;
            case "2":
                mostrarResumenDeViaje(viajeCapturado);
                break;
            case "3":
                generarPlanDePago(viajeCapturado);
                break;
            case "0":
                finalizar();
                mostrarMenu = false;
                break;
            default:
                console.log("Opcion no Valida");
                break;
        }
    } while (mostrarMenu);
}

function mostrarResumenDeViaje(viaje) {
    if (viaje === null || viaje === undefined) {
        alert("No has creado tu viaje, ve a la opción Crea tu viaje");
    } else {
        viaje.mostrarInformacionDeViaje();
        viaje.calcularValorViaje();
    }
}

function generarPlanDePago(viaje) {
    if (viaje === null || viaje === undefined) {
        alert("No has creado tu viaje, ve a la opción Crea tu viaje");
    } else {
        // capturar a cuantas cuotas diferir el viaje
        let cuotasADiferirElPago = parseInt(
            prompt("¿A cuantas cuotas quieres pagar tu viaje?")
        );
        // for para imprimir cuotas del viaje
        viaje.calcularPlanDePago(cuotasADiferirElPago);
    }
}
