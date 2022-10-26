import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios-administrador',
  templateUrl: './registro-usuarios-administrador.component.html',
  styleUrls: ['./registro-usuarios-administrador.component.css']
})
export class RegistroUsuariosAdministradorComponent implements OnInit {

  @Output() volverEvent = new EventEmitter<any>();

  @Input () set tipoRegistro(value : any)
  {
    this.tipoFormulario = value;
  }

  tipoFormulario : any = ""; 
  activateForm:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    if(this.tipoFormulario != "ADM"){
      this.activateForm = true;
    }else{
      this.activateForm = false;
    }
  }

  volver(){
    this.volverEvent.emit(false);
  }
  
}
