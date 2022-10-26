export class Especialista {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    especialidad:string;
    mail:string;
    password:string;
    foto:string;
    habilitado?:boolean;
    tipoUsuario?:string;

    constructor(
        nombre:string,
        apellido:string,
        edad:number,
        dni:number,
        especialidad:string,
        mail:string,
        password:string,
        foto:string
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidad = especialidad;
        this.mail = mail;
        this.password = password;
        this.foto = foto;
        this.habilitado = false;
        this.tipoUsuario = "ESP"
    }
}
