import { Component, Input, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';

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
  
          //console.log(this.paciente);
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
  
          //console.log(this.especialista);
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
  
          //console.log(this.administrador);
          break;
      }
    }, 500);

   
  }

  constructor() { }

  ngOnInit(): void {
  }

}
