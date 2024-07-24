import { Component, Input, OnInit } from '@angular/core';
import { Administrador } from 'src/app/classes/administrador';
import { Especialista } from 'src/app/classes/especialista';
import { Paciente } from 'src/app/classes/paciente';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  paciente: Paciente = new Paciente("","",99,99999999,"","","",[]);
  especialista: Especialista = new Especialista("","",99,99999999,"","","","");
  administrador: Administrador = new Administrador("","",99,99999999,"","","");

  isPAC: boolean = false;
  isESP: boolean = false;
  isADM: boolean = false;

  spinner:boolean = false;

  @Input () set infoUsuario(value : any)
  {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      switch (value.tipoUsuario) {
        case "PAC":
          this.paciente.nombre = value.nombre;
          this.paciente.apellido = value.apellido;
          this.paciente.edad = value.edad;
          this.paciente.dni = value.dni;
          this.paciente.obra_social = value.obra_social;
          this.paciente.mail = value.mail;    
          this.paciente.foto = value.foto;
  
          this.isPAC = true;
          this.isESP = false;
          this.isADM = false;
  
          break;
        case "ESP":
          this.especialista.nombre = value.nombre;
          this.especialista.apellido = value.apellido;
          this.especialista.edad = value.edad;
          this.especialista.dni = value.dni;
          this.especialista.especialidad = value.especialidad;
          this.especialista.mail = value.mail;    
          this.especialista.foto = value.foto;
  
          this.isESP = true;
          this.isPAC = false;
          this.isADM = false;
  
          break;
        case "ADM":
          this.administrador.nombre = value.nombre;
          this.administrador.apellido = value.apellido;
          this.administrador.edad = value.edad;
          this.administrador.dni = value.dni;
          this.administrador.mail = value.mail;    
          this.administrador.foto = value.foto;
  
          this.isADM = true;
          this.isPAC = false;
          this.isESP = false;
          break;
      }
    }, 500);

   
  }

  constructor() { }

  ngOnInit(): void {
  }

}
