export class HistoriaClinica {
    id_paciente: string;
    altura: string | number;
    peso: string | number;
    temperatura: string | number;
    presion: string | number;
    dato_clinico_1: [] | string;
    dato_clinico_2: [] | string;
    dato_clinico_3: [] | string;

    constructor(
        id_paciente: string,
        altura: string | number, 
        peso: string | number, 
        temperatura: string | number, 
        presion: string | number,
        dato_clinico_1: [] | string,
        dato_clinico_2: [] | string,
        dato_clinico_3: [] | string,
        ){

            this.id_paciente = id_paciente;
            this.altura = altura;
            this.peso = peso;
            this.temperatura = temperatura;
            this.presion = presion;
            this.dato_clinico_1 = dato_clinico_1;
            this.dato_clinico_2 = dato_clinico_2;
            this.dato_clinico_3 = dato_clinico_3;
    }
}
