export class Administrador {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    mail:string;
    password:string;
    foto:string;
    tipoUsuario?:string;

    constructor(
        nomber:string,
        apellido:string,
        edad:number,
        dni:number,
        mail:string,
        password:string,
        foto:string
    ){
        this.nombre = nomber;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.password = password;
        this.foto = foto;
        this.tipoUsuario = "ADM";
    }
}
