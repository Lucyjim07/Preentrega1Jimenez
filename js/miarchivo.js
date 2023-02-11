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
    }

    // Calcular las cuotas a pagar del viaje
    generarPlanDePago(cuotasADiferirElPago) {

        // verificar que el valor del viaje si se calculó
        if (this.valor === null || this.valor === undefined) {
            this.calcularValor();
        }
        // calcular valor de la cuota
        this.valorCuota = this.valor / cuotasADiferirElPago;
    }

    static fromJSON(serializedJson) {
        return Object.assign(new Viaje(), JSON.parse(serializedJson))
    }
}

// constantes
const LISTA_VIAJES = "viajes";
const MI_VIAJE = "miViaje";

// Instanciación de objetos
const viaje1 = new Viaje(1, "Cartagena", 2, 1, 3);
const viaje2 = new Viaje(2, "Cali", 3, 2, 3);
const viaje3 = new Viaje(3, "Santa Marta", 4, 0, 4);
const viaje4 = new Viaje(4, "Medellin", 4, 1, 4);

// Crear un areglo de objetos tipo viaje
const viajes = [viaje1, viaje2, viaje3, viaje4];

// Guardar viajes en localStorage
localStorage.setItem(LISTA_VIAJES, JSON.stringify(viajes));

let divViajesReservado = document.getElementById("viajesReservados");
let txtCiudad = document.getElementById("txtCiudad");

txtCiudad.addEventListener("input", () => {
    let busqueda = txtCiudad.value;

    if(busqueda === ''){
        verReservasDeViajes(viajes);
    } else {
        buscarPorCiudad(busqueda, viajes);
    }
});


verReservasDeViajes(viajes);

function verReservasDeViajes(listaDeViajes) {

    divViajesReservado.innerHTML = "";
    
    for(let viaje of listaDeViajes) {
        let divNuevoViaje = document.createElement("div");
        divNuevoViaje.className = "col-12 col-md-6 col-lg-4 my-3";
        divNuevoViaje.innerHTML = `
            <div id="${viaje.id}" class="card mb-3" style="max-width: 480px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="./img/avion.png" class="img-fluid rounded-start" alt="imagen-destino">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">Viaje reservado a ${viaje.destino}</h4>
                            <p class="card-text">Tu paquete de viaje es el siguiente</p>
                            <p class="card-text mb-1">Adultos: <span class="text-muted">${viaje.adultos}</span></p>
                            <p class="card-text mb-1">Niños: <span class="text-muted">${viaje.ninios}</span></p>
                            <p class="card-text mb-1">Días: <span class="text-muted">${viaje.dias}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `

        divViajesReservado.appendChild(divNuevoViaje);
    }
}

function buscarPorCiudad(ciudadParaBuscar, listaDeViajes){

    let resultadoBusqueda = listaDeViajes.filter(
        viaje => viaje.destino.toLowerCase().includes(ciudadParaBuscar)
    );

    verReservasDeViajes(resultadoBusqueda);
}

// let quieresViajar = prompt("pensando en viajar si o no");

// función principal que ejecuta el simulador de viaje
// if (quieresViajar == "si") {
//     siViajar();
// } else {
//     finalizar();
// }

// Proceso principal viajar
// function siViajar() {
//     mostrarMenu();
// }

// Proceso finalizar el programa
// function finalizar() {
//     console.log("Vuelve pronto");
//     alert("Vuelva pronto");
// }

// // Capturar los datos del viaje
// // destino, adultos, niños y días
// function capturarDatosDelViaje() {
//     // agregar destinos nacionales e internacionales con un menú
//     let destino = prompt(`Ingresa tu destino:
//         Cartagena 
//         Cali
//         Medellin
//         Santa Marta`);
//     let cantidadDeAdultos = parseInt(prompt("Cuantas adultos piensan viajar"));
//     let cantidadDeNinios = parseInt(prompt("Cuantas niños piensan viajar"));
//     let cantidadDeDias = parseInt(prompt("Cuantos días piensas viajar"));

//     const miViaje = new Viaje(
//         viajes.length + 1,
//         destino,
//         cantidadDeAdultos,
//         cantidadDeNinios,
//         cantidadDeDias
//     );

//     return miViaje;
// }

// // Menú de la aplicación
// function mostrarMenu() {
//     let mostrarMenu = true;
//     let viajeCapturado;
//     do {
//         let opcionMenu = prompt(`Ingrese la opción deseada
//         1 - Crea tu viaje
//         2 - Resumen del viaje
//         3 - Plan de pago
//         4 - Reservar viaje
//         5 - Mostrar viajes por ciudad
//         0 - Salir del menu`);
//         switch (opcionMenu) {
//             case "1":
//                 viajeCapturado = capturarDatosDelViaje();
//                 break;
//             case "2":
//                 if(viajeCapturado === null || viajeCapturado === undefined){
//                     alert("No has creado tu viaje, ve a la opción Crea tu viaje");
//                 } else {
//                     viajeCapturado.mostrarInformacion();
//                     viajeCapturado.calcularValor();
//                 }
//                 break;
//             case "3":
//                 if(viajeCapturado === null || viajeCapturado === undefined){
//                     alert("No has creado tu viaje, ve a la opción Crea tu viaje");
//                 } else {
//                     viajeCapturado.generarPlanDePago();
//                 }
//                 break;
//             case "4":
//                 reservarViaje(viajeCapturado);
//                 break;
//             case "5":
//                 filtrarViajes();                
//                 break; 
//             case "0":
//                 finalizar();
//                 mostrarMenu = false;
//                 break;
//             default:
//                 console.log("Opcion no Valida");
//                 break;
//         }
//     } while (mostrarMenu);
// }

// // Mostrar resumen de viaje.
// // Ejecuta las funciones mostrarInformacionDeViaje y calcularValorViaje
// function mostrarResumenDeViaje(viaje) {
//     if (viaje === null || viaje === undefined) {
//         alert("No has creado tu viaje, ve a la opción Crea tu viaje");
//     } else {
//         viaje.mostrarInformacion();
//         viaje.calcularValor();
//     }
// }

// agregar un viaje recien capturado al arreglo de los viajes
function reservarViaje(viaje) {
    const reservar = prompt ('Quire realizar una reserva si o no');
    if (reservar === "si") {
        viajes.push(viaje)
    }else{
        alert ('Vuelve al menu inicial y crea tu viaje')
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

function filtrarViajes() {
    const ciudad = prompt(`¿Por qué ciudad quiere hacer el filtro?
        Cartagena
        Cali
        Medellin
        Santa Marta`);

    const viajesPorCiudad = viajes.filter((viaje) => viaje.destino === ciudad);
    
    if (viajesPorCiudad.length === 0) {
        console.log(`No existen viajes a la ciudad ${ciudad}`);
    } else {
        console.log("El resultado de su busqueda es:");
        for (let viaje of viajesPorCiudad) {
            viaje.mostrarInformacion();
        }
    }
}






// obtener elementos
let btnCapturarViaje = document.getElementById("btnCapturarViaje");
let btnMostrarResumenViaje = document.getElementById("btnMostrarResumenViaje");
let btnPlanPago = document.getElementById("btnPlanPago");
let btnGenerarPlanPago = document.getElementById("btnGenerarPlanPago");





// agregar eventos a botones
btnCapturarViaje.addEventListener("click", () => {
    capturarViaje();
});

btnMostrarResumenViaje.addEventListener("click", () => {
    mostrarResumenViajeHtml();
});

btnGenerarPlanPago.addEventListener("click", () => {
    mostrarPlanPagoHtml();
});



// funciones de los botones
function capturarViaje() {
    let txtDestino = document.getElementById("txtDestino");
    let txtAdultos = document.getElementById("txtAdultos");
    let txtNinios = document.getElementById("txtNinios");
    let txtDias = document.getElementById("txtDias");
    
    const miViaje = new Viaje(
        viajes.length + 1,
        txtDestino.value,
        parseInt(txtAdultos.value),
        parseInt(txtNinios.value),
        parseInt(txtDias.value)
    )
    
    localStorage.setItem(MI_VIAJE, JSON.stringify(miViaje));

    let resumenViaje = document.getElementById("resumenViaje");
    resumenViaje.innerHTML = "";

    let planPago = document.getElementById("planPago");
    planPago.innerHTML = "";

}

function mostrarResumenViajeHtml() {
    let divResumenViaje = document.getElementById("resumenViaje");

    const miViajeRecuperado = JSON.parse(localStorage.getItem(MI_VIAJE));

    if(miViajeRecuperado === null || miViajeRecuperado === undefined){
        alert("Vuelve a la opción crea tu viaje")
    } else {

        const miViaje = new Viaje(miViajeRecuperado.id,
            miViajeRecuperado.destino,
            miViajeRecuperado.adultos,
            miViajeRecuperado.ninios,
            miViajeRecuperado.dias);

        divResumenViaje.innerHTML = `
        <div class="card mb-3" style="max-width: 480px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="./img/avion.png" class="img-fluid rounded-start" alt="imagen-destino">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">Disfruta tu viaje a ${miViaje.destino}</h4>
                        <p class="card-text">Tu paquete de viaje es el siguiente</p>
                        <p class="card-text mb-1">Adultos: <span class="text-muted">${miViaje.adultos}</span></p>
                        <p class="card-text mb-1">Niños: <span class="text-muted">${miViaje.ninios}</span></p>
                        <p class="card-text mb-1">Días: <span class="text-muted">${miViaje.dias}</span></p>
                        <a id="btnReservarViaje" href="#" class="btn btn-primary">Reserva tu viaje</a>
                        <a id="btnPlanPago" href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#formularioGenerarPlanPago">Plan de pago</a>
                    </div>
                </div>
            </div>
        </div>`
        ;

        // boton para ver el plan de pago
        let btnPlanPago = document.getElementById("btnPlanPago");
        btnPlanPago.addEventListener("click", () => {
            miViaje.calcularValor();
            mostrarValorViajeModalHtml(miViaje.valor);
        });

        // boton para hacer la reserva del viaje

    }
}

function mostrarValorViajeModalHtml(valorViaje) {
    let divValorViaje = document.getElementById("valorViaje");

    divValorViaje.innerHTML = `<p>El valor de su viaje es: COP ${valorViaje}.<br />
    A cuantas cuotas quieres dividir tu viaje</p> `;
}

function mostrarPlanPagoHtml() {
    const miViajeRecuperado = JSON.parse(localStorage.getItem(MI_VIAJE));

    if(miViajeRecuperado === null || miViajeRecuperado === undefined){
        alert("Vuelve a la opción crea tu viaje")
    } else {
        const miViaje = new Viaje(miViajeRecuperado.id,
            miViajeRecuperado.destino,
            miViajeRecuperado.adultos,
            miViajeRecuperado.ninios,
            miViajeRecuperado.dias);

        let divPlanPago = document.getElementById("planPago");
        const txtCuotas = document.getElementById("txtCuotas");
        const numeroDeCuotas = parseInt(txtCuotas.value)

        miViaje.generarPlanDePago(numeroDeCuotas);

        let filas = "";

        for(let miCuota = 1; miCuota <= numeroDeCuotas; miCuota++){
            filas += `
            <tr>
                <th scope="row">${miCuota}</th>
                <td>Valor de la cuota ${miCuota}</td>
                <td>${miViaje.valorCuota}</td>
            </tr>
            `;
        }

        divPlanPago.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                    <tr>
                        <th scope="row"></th>
                        <td>Total</td>
                        <td>${miViaje.valor}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}






let txtCuotas = document.getElementById("txtCuotas");

txtCuotas.addEventListener("mouseout", () => {
    let value = parseInt(txtCuotas.value);

    if(value > 12) {
        alert('Valor no permitido');
    }
});