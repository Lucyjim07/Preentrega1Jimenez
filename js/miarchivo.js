let quieresViajar = prompt("pensando en viajar si o no");

// función principal que ejecuta el simulador de viaje
if (quieresViajar == "si") {
    siViajar();
} else {
    finalizar();
}

// Clase que guarda los datos para el viaje
function Viaje(destino, adultos, ninios, dias){
    this.destino = destino;
    this.adultos = adultos;
    this.ninios = ninios;
    this.dias = dias;
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

// Mostrar resumen de viaje.  
// Ejecuta las funciones mostrarInformacionDeViaje y calcularValorViaje
function mostrarResumenDeViaje(viaje) {
    if (viaje === null || viaje === undefined) {
        alert("No has creado tu viaje, ve a la opción Crea tu viaje");
    } else {
        mostrarInformacionDeViaje(viaje);
        calcularValorViaje(viaje);
    }
}

// Imprimir los datos del viaje en consola
function mostrarInformacionDeViaje(viaje) {
    console.clear();
    console.group('Viaje');
        console.table(
            {
                'Destino': viaje.destino, 
                'Adultos': viaje.adultos,
                'Niños': viaje.ninios,
                'Dias': viaje.dias
            });
    console.groupEnd('Viaje');
}

// Calcular el valor del viaje según los datos ingresados
// adultos, niños y días
function calcularValorViaje(viaje) {
    switch (viaje.destino) {
        case "1": // Cartagena
            viaje.valor = ((viaje.adultos * 450000) + (viaje.ninios * 300000)) * viaje.dias;
            break;
        case "2": // Cali
            viaje.valor = ((viaje.adultos * 200000) + (viaje.ninios * 180000)) * viaje.dias;
            break;
        case "3": // Medellin
            viaje.valor = ((viaje.adultos * 280000) + (viaje.ninios * 200000)) * viaje.dias;
            break;
        case "4": // Santa Marta
            viaje.valor = ((viaje.adultos * 600000) + (viaje.ninios * 450000)) * viaje.dias;
            break;
        default:
            console.log("Opcion no Valida");
            break;
    }

    console.log(`El valor de su viaje es: COP ${viaje.valor}`);
    alert(`El valor de su viaje es: COP ${viaje.valor}`);
}

// Calcular las cuotas a pagar del viaje
function generarPlanDePago(viaje) {
    if (viaje === null || viaje === undefined) {
        alert("No has creado tu viaje, ve a la opción Crea tu viaje");
    } else {

        let cuotasADiferirElPago = 1;

        do {
            // capturar a cuantas cuotas diferir el viaje
            cuotasADiferirElPago = parseInt(prompt("¿A cuantas cuotas quieres pagar tu viaje?"));
        } while(cuotasADiferirElPago > 12)

        // verificar que el valor del viaje si se calculó
        if(viaje.valor === null || viaje.valor === undefined) {
            alert("Para conocer el valor de tu viaje, debes ir a la opción 2 Resumen del viaje");
        }
        else {
            // calcular valor de la cuota
            const valorDeMiCuota = viaje.valor / cuotasADiferirElPago

            // ciclo para imprimir cuotas del viaje
            for (let miCuota = 1; miCuota <= cuotasADiferirElPago; miCuota++) {
                console.log(`Su cuota ${miCuota} será de COP ${valorDeMiCuota}`)
            }
        }
    }
}
