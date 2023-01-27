class Viaje {
    constructor(id, destino, adultos, ninios, dias) {
        (this.id = id),
            (this.destino = destino),
            (this.adultos = adultos),
            (this.ninios = ninios),
            (this.dias = dias);
    }

    // metodos
    // muestra de forma ordenada la informacion de este viaje
    mostrarInformacion() {
        console.log(
            `El destino de su viaje es: ${this.destino}, las personas que viajarán son, ${this.adultos} adultos y ${this.ninios} niños durante ${this.dias} días`
        );
    }

    // Calcular el valor del viaje según los datos ingresados
    // adultos, niños y días
    calcularValor() {
        switch (this.destino) {
            case "Cartagena":
                this.valor =
                    (this.adultos * 450000 + this.ninios * 300000) * this.dias;
                break;
            case "Cali":
                this.valor =
                    (this.adultos * 200000 + this.ninios * 180000) * this.dias;
                break;
            case "Medellin":
                this.valor =
                    (this.adultos * 280000 + this.ninios * 200000) * this.dias;
                break;
            case "Santa Marta":
                this.valor =
                    (this.adultos * 600000 + this.ninios * 450000) * this.dias;
                break;
            default:
                console.log("Opcion no Valida");
                break;
        }

        console.log(`El valor de su viaje es: COP ${this.valor}`);
        alert(`El valor de su viaje es: COP ${this.valor}`);
    }

    // Calcular las cuotas a pagar del viaje
    generarPlanDePago() {
        let cuotasADiferirElPago = 1;

        do {
            // capturar a cuantas cuotas diferir el viaje
            cuotasADiferirElPago = parseInt(
                prompt("¿A cuantas cuotas quieres pagar tu viaje?")
            );
        } while (cuotasADiferirElPago > 12);

        // verificar que el valor del viaje si se calculó
        if (this.valor === null || this.valor === undefined) {
            this.calcularValorViaje();
        }
        // calcular valor de la cuota
        const valorDeMiCuota = this.valor / cuotasADiferirElPago;

        // ciclo para imprimir cuotas del viaje
        for (let miCuota = 1; miCuota <= cuotasADiferirElPago; miCuota++) {
            console.log(`Su cuota ${miCuota} será de COP ${valorDeMiCuota}`);
        }
    }
}

// Instanciación de objetos
const viaje1 = new Viaje(1, "Cartagena", 2, 1, 3);
const viaje2 = new Viaje(2, "Cali", 3, 2, 3);
const viaje3 = new Viaje(3, "Santa Marta", 4, 0, 4);
const viaje4 = new Viaje(4, "Medellin", 4, 1, 4);

// Crear un areglo de objetos tipo viaje
const viajes = [viaje1, viaje2, viaje3, viaje4];
//             [   0  ,   1   ,   2   ,   3   ];

let quieresViajar = prompt("pensando en viajar si o no");

// función principal que ejecuta el simulador de viaje
if (quieresViajar == "si") {
    siViajar();
} else {
    finalizar();
}

// Proceso principal viajar
function siViajar() {
    mostrarMenu();
}

// Proceso finalizar el programa
function finalizar() {
    console.log("Vuelve pronto");
    alert("Vuelva pronto");
}

// Capturar los datos del viaje
// destino, adultos, niños y días
function capturarDatosDelViaje() {
    // agregar destinos nacionales e internacionales con un menú
    let destino = prompt(`Ingresa tu destino:
        Cartagena 
        Cali
        Medellin
        Santa Marta`);
    let cantidadDeAdultos = parseInt(prompt("Cuantas adultos piensan viajar"));
    let cantidadDeNinios = parseInt(prompt("Cuantas niños piensan viajar"));
    let cantidadDeDias = parseInt(prompt("Cuantos días piensas viajar"));

    const miViaje = new Viaje(
        viajes.length + 1,
        destino,
        cantidadDeAdultos,
        cantidadDeNinios,
        cantidadDeDias
    );

    return miViaje;
}

// Menú de la aplicación
function mostrarMenu() {
    let mostrarMenu = true;
    let viajeCapturado;
    do {
        let opcionMenu = prompt(`Ingrese la opción deseada
        1 - Crea tu viaje
        2 - Resumen del viaje
        3 - Plan de pago
        4 - Reservar viaje
        0 - Salir del menu`);
        switch (opcionMenu) {
            case "1":
                viajeCapturado = capturarDatosDelViaje();
                break;
            case "2":
                if(viajeCapturado === null || viajeCapturado === undefined){
                    alert("No has creado tu viaje, ve a la opción Crea tu viaje");
                } else {
                    viajeCapturado.mostrarInformacion();
                    viajeCapturado.calcularValor();
                }
                break;
            case "3":
                if(viajeCapturado === null || viajeCapturado === undefined){
                    alert("No has creado tu viaje, ve a la opción Crea tu viaje");
                } else {
                    viajeCapturado.generarPlanDePago();
                }
                break;
            case "4":
                reservarViaje(viajeCapturado);
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

// Mostrar resumen de viaje.
// Ejecuta las funciones mostrarInformacionDeViaje y calcularValorViaje
function mostrarResumenDeViaje(viaje) {
    if (viaje === null || viaje === undefined) {
        alert("No has creado tu viaje, ve a la opción Crea tu viaje");
    } else {
        viaje.mostrarInformacion();
        viaje.calcularValor();
    }
}

// agregar un viaje recien capturado al arreglo de los viajes
function reservarViaje(viaje) {
    const reservar = prompt ('Quire realizar una reserva si o no');
    if (reservar == "si") {
        viajes.push(viaje)
    }else{
        alert ('Regrese a la opcion realizar crear viaje')
    } 
    mostrarViajesReservados(viajes);
}

// muestra los viajes que se han reservado (que se han agregado al arreglo de viajes)
function mostrarViajesReservados(viajes) {
    console.log("Los viajes reservados son:");
    for (let viaje of viajes) {
        viaje.mostrarInformacion();
    }
}
