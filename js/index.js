// obtener elementos
let btnModalCrearViaje = document.getElementById("btnModalCrearViaje");
let btnCapturarViaje = document.getElementById("btnCapturarViaje");
let btnMostrarResumenViaje = document.getElementById("btnMostrarResumenViaje");
let btnPlanPago = document.getElementById("btnPlanPago");
let btnGenerarPlanPago = document.getElementById("btnGenerarPlanPago");
let divViajesReservado = document.getElementById("viajesReservados");
let txtCiudad = document.getElementById("txtCiudad");
let divErrorViaje = document.getElementById("errorViaje");
let btnDescartarViaje = document.getElementById("btnDescartarViaje");




// agregar eventos a botones
btnModalCrearViaje.addEventListener("click", () => {
    divErrorViaje.innerHTML = "";
});

btnCapturarViaje.addEventListener("click", () => {
    capturarViaje();
});

btnMostrarResumenViaje.addEventListener("click", () => {
    mostrarResumenViajeHtml();
});

btnGenerarPlanPago.addEventListener("click", () => {
    mostrarPlanPagoHtml();
});

txtCiudad.addEventListener("input", () => {
    let busqueda = txtCiudad.value;

    if(busqueda === ''){
        verReservasDeViajesHtml(viajes);
    } else {
        buscarPorCiudad(busqueda, viajes);
    }
});

btnDescartarViaje.addEventListener("click", ()=> {
    descartarViaje();
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
        mostrarErrorViajeHtml()
    } else {

        const miViaje = new Viaje(miViajeRecuperado.id,
            miViajeRecuperado.destino,
            miViajeRecuperado.adultos,
            miViajeRecuperado.ninios,
            miViajeRecuperado.dias);

        // Desestructuracion
        const {destino, adultos, ninios, dias} = miViaje;

        divResumenViaje.innerHTML = `
        <div class="card mb-3" style="max-width: 480px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="./img/avion.png" class="img-fluid rounded-start" alt="imagen-destino">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">Disfruta tu viaje a ${destino}</h4>
                        <p class="card-text">Tu paquete de viaje es el siguiente</p>
                        <p class="card-text mb-1">Adultos: <span class="text-muted">${adultos}</span></p>
                        <p class="card-text mb-1">Niños: <span class="text-muted">${ninios}</span></p>
                        <p class="card-text mb-1">Días: <span class="text-muted">${dias}</span></p>
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
        let btnReservarViaje = document.getElementById("btnReservarViaje");
        btnReservarViaje.addEventListener("click", () => {
            agregarViajeReservado(miViaje, viajes);
        });

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

function agregarViajeReservado(miViaje, listaDeViajes) {
    listaDeViajes.push(miViaje);
    verReservasDeViajesHtml(listaDeViajes);

    descartarViaje();

    localStorage.setItem(LISTA_VIAJES, JSON.stringify(listaDeViajes));
}

function verReservasDeViajesHtml(listaDeViajes) {

    divViajesReservado.innerHTML = "";
    
    for(let viaje of listaDeViajes) {

        // Desestructuracion
        const {destino, adultos, ninios, dias} = viaje;

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
                            <h4 class="card-title">Viaje reservado a ${destino}</h4>
                            <p class="card-text">Tu paquete de viaje es el siguiente</p>
                            <p class="card-text mb-1">Adultos: <span class="text-muted">${adultos}</span></p>
                            <p class="card-text mb-1">Niños: <span class="text-muted">${ninios}</span></p>
                            <p class="card-text mb-1">Días: <span class="text-muted">${dias}</span></p>
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

    verReservasDeViajesHtml(resultadoBusqueda);
}

function mostrarErrorViajeHtml(){
    divErrorViaje.innerHTML = `
    <div class="alert alert-danger" role="alert">
        Vuelve a la opción crea tu viaje
    </div>`;
}

function descartarViaje(){
    let divresumenViaje = document.getElementById("resumenViaje");
    divresumenViaje.innerHTML = "";

    let divplanPago = document.getElementById("planPago");
    divplanPago.innerHTML = "";

    localStorage.removeItem(MI_VIAJE);
}

setTimeout(() => {
    const textoCargando = document.getElementById("textoCargando");
    const loader = document.getElementById("loader");
    textoCargando.remove();
    loader.remove();
    verReservasDeViajesHtml(viajes);
}, 1200);
