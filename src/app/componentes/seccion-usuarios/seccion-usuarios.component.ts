import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {

  infoUsuarios:boolean = false;
  tipoListado: string = "";

  registroUsuariosAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  listarUsuario(tipo: string){
    switch (tipo) {
      case "PAC":
        this.tipoListado = "PAC";        
      break;
      case "ESP":
        this.tipoListado = "ESP";
      break;
      case "ADM":
        this.tipoListado = "ADM";
      break;
    }
    
    this.infoUsuarios = true;
    this.registroUsuariosAdmin = false;
  }

  registroUsuario(tipo: string){
    switch (tipo) {
      case "PAC":
        this.tipoListado = "PAC";        
      break;
      case "ESP":
        this.tipoListado = "ESP";
      break;
      case "ADM":
        this.tipoListado = "ADM";
      break;
    }
  
    this.registroUsuariosAdmin = true;
    this.infoUsuarios = false;
  }

  estadoInfoUsuarios(event :any){
    this.infoUsuarios = event;    
  }

  estadoRegistroUsuario(event: any){
    this.registroUsuariosAdmin = event; 
  }
}
