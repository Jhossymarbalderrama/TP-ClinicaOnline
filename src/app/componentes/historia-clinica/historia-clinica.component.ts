import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/auth.service';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  @Output() volverEvent = new EventEmitter<any>();

  listadoPacientes: any = [];
  listaPacienteAux: any = [];

  listaTurnosAux: any = [];
  listaTurnos: any = [];
  listaHistorialesClinicos: any = [];
  auxHistoriasClinicas: any = [];
  spinner: boolean = true;

  pacienteSeleccionado: any = "";

  spinnerHC: boolean = false;

  constructor(
    private FirestoreService: FirestoreService,
    public AuthService: AuthService
  ) {
    
    this.FirestoreService.listaTurnos().subscribe(turnos => {
      this.listaTurnos = turnos;
      this.cargarTurnos();
    });

    this.FirestoreService.listaHistorialesClinicos().subscribe(historiaClinica =>{
        this.listaHistorialesClinicos = historiaClinica;
        this.cargarHistoriasClinicas();
    });

    this.FirestoreService.listaPacientes().subscribe(paciente => {
      this.listadoPacientes = paciente;
      this.cargarPacientes();
    });

    // if(this.AuthService.user.tipoUsuario == 'ESP'){
    //   this.buscarPacientesXespecialista();
    // }
  }

  cargarPacientes(){
    this.listaPacienteAux = [];

    if(this.AuthService.user.tipoUsuario == 'ESP'){
      let aux: any ;
      
      this.listadoPacientes.forEach(paciente => {
        
        this.listaTurnos.forEach(turno => {
          if(paciente.id == turno.paciente.id &&
            turno.estado_turno == "Realizado" &&
            turno.especialista.id == this.AuthService.user.id){
            this.listaPacienteAux.push(paciente);
          }
        });

      });

      aux = this.listaPacienteAux.filter((item, index)=>{
        return this.listaPacienteAux.indexOf(item) === index;
      });

      this.listaPacienteAux = aux;

    }else{
      this.listadoPacientes.forEach(paciente => {
        this.listaPacienteAux.push(paciente);
      });
    }
    
  }

  cargarTurnos() {
    this.listaTurnos.forEach(element => {
      this.listaTurnosAux.push(element);
    });
  }

  cargarHistoriasClinicas(){
    this.listaHistorialesClinicos.forEach(element => {
      this.auxHistoriasClinicas.push(element);
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
  
  // buscarPacientesXespecialista(){
    
  // }
  
  seleccionarPaciente(paciente: any) {
      this.spinnerHC = true;
      
      setTimeout(() => {      
        this.pacienteSeleccionado = paciente;
        this.spinnerHC = false;
      }, 1500);
  }

  volver() {
    this.volverEvent.emit(false);
  }
}
