export class Paciente {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    obra_social:string;
    mail:string;
    password:string;
    foto:Array<string>;
    tipoUsuario?:string;

    constructor(
        nombre:string,
        apellido:string,
        edad:number,
        dni:number,
        obra_social:string,
        mail:string,
        password:string,
        foto:[]
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obra_social = obra_social;
        this.mail = mail;
        this.password = password;
        this.foto = foto;
        this.tipoUsuario = "PAC";
    }
}
