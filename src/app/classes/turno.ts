import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    paciente: string | Paciente | Object;
    especialidad:string;
    especialista: string | Especialista | Object;
    fecha: string | Date | [];
    estado_turno: boolean | string; //Pendiente - Aceptado - Finalizado - Cancelado - Rechazado
    resenea?: string;
    encuesta?: string;
    calificacion_atencion?: string;

    constructor(paciente: string | Paciente | Object,especialidad: string, especialista: string | Especialista, fecha: string | Date | [], estado_turno: boolean | string, resenea?: string, encuesta?: string, calificacion_atencion?: string){
        this.paciente = paciente;
        this.especialidad = especialidad;
        this.especialista = especialista;
        this.fecha = fecha;
        this.estado_turno = estado_turno;

        this.resenea = resenea;
        this.encuesta = encuesta;
        this.calificacion_atencion = calificacion_atencion;
    }
}
