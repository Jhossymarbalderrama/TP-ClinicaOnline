import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  tipoFormulario : any = ""; 
  activateForm:boolean = false;

  constructor() { }

  ngOnInit(): void {
    // this.cargarFormulario("especialistas");
    // this.cambioFormulario(true);
  }

  cargarFormulario(tipo:string){
    this.activateForm = true;
    this.tipoFormulario = tipo;
  }

  cambioFormulario(event:any){
    this.activateForm = event;
  }
}
