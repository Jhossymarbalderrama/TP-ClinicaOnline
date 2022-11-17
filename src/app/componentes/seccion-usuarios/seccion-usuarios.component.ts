import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/servicios/excel.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {

  infoUsuarios:boolean = false;
  registroUsuariosAdmin: boolean = false;
  historiasClincias: boolean = false;

  tipoListado: string = "";


  listaPaciente:any = [];
  listaEspecialista: any = [];
  listaAdministradores: any = [];

  listaUsuarios: any = [];

  constructor(
    private FirestoreService: FirestoreService,
    private ExcelService: ExcelService
  ) {   
    this.listaUsuarios = [];
    
    this.FirestoreService.listaAdministradores().subscribe(adm => {
      this.listaAdministradores = adm;
      this.cargarAdm();
    }); 

    this.FirestoreService.listaEspecialistas().subscribe(esp => {
      this.listaEspecialista = esp;
      this.cargarEsp();
    }); 

    this.FirestoreService.listaPacientes().subscribe(pac => {
      this.listaPaciente = pac;
      this.cargarPac();
    }); 
    
  }

  cargarAdm(){
    this.listaAdministradores.forEach(element => {
      this.listaUsuarios.push(element);
    });
  }

  cargarEsp(){
    this.listaEspecialista.forEach(element => {
      this.listaUsuarios.push(element);
    });
  }

  cargarPac(){
    this.listaPaciente.forEach(element => {
      this.listaUsuarios.push(element);
    });
  }

  ngOnInit(): void {
  }

  exportexcel(){
    this.ExcelService.exportexcel("Lista_Usuarios_","excel-table");
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
    this.historiasClincias = false;
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
    this.historiasClincias = false;
  }

  estadoInfoUsuarios(event :any){
    this.infoUsuarios = event;    
  }

  estadoRegistroUsuario(event: any){
    this.registroUsuariosAdmin = event; 
  }

  estadoHistoriasClinicas(event: any){
    this.historiasClincias = event;
  }
  
  verHistoriasClinicas(){
    this.historiasClincias = true;
    this.registroUsuariosAdmin = false;
    this.infoUsuarios = false;
  }
}
