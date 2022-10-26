import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-usuarios',
  templateUrl: './info-usuarios.component.html',
  styleUrls: ['./info-usuarios.component.css']
})
export class InfoUsuariosComponent implements OnInit {

  @Output() volverEvent = new EventEmitter<any>();

  @Input () set tipoListado(value : any)
  {
    this.tipo = value;

    this.cambiarTitulo();
  }

  tipo: string = "";
  infoUsuario: any = "";
  titulo: string = "";

  constructor(
    private Router: Router
  ) { }

  ngOnInit(): void {
  }

  capturoUsuario($event: any){
    this.infoUsuario = $event;
  }

  volver(){
    this.volverEvent.emit(false);
  }

  cambiarTitulo(){
    switch (this.tipo) {
      case "PAC":
        this.titulo = "Pacientes";        
      break;
      case "ESP":
        this.titulo = "Especialistas";
      break;
      case "ADM":
        this.titulo = "Administradores";
      break;
    }
  }
}
