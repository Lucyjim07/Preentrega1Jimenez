const DateTime = luxon.DateTime;
let fecha = document.getElementById("fecha");

setInterval(() => {
    const fechaHoy = DateTime.now();
    const fechaActual = fechaHoy.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
    fecha.innerHTML = `${fechaActual}`;
}, 1000);