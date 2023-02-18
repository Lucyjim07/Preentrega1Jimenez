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