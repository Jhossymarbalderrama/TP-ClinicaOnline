import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Paciente } from 'src/app/classes/paciente';
import { ExcelService } from 'src/app/services/excel.service';



@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {

  @Output() usuarioEvent = new EventEmitter<any>();

  listadoPacientes: any = "";
  spinner:boolean = true;

  listTurno: any = [];
  listaTurnosXpaciente: any = [];

  constructor(
    private FirestoreService: FirestoreService,
    private ExcelService: ExcelService
  ) { 
    this.FirestoreService.listaPacientes().subscribe(paciente => {
      this.listadoPacientes = paciente;
    });    

    this.FirestoreService.listaTurnos().subscribe(turnos =>{
      this.listTurno = turnos;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }


  seleccionarPaciente(paciente: Paciente){
    this.usuarioEvent.emit(paciente);
  }
}
