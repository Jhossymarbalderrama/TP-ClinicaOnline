import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Paciente } from 'src/app/clases/paciente';
import { ExcelService } from 'src/app/servicios/excel.service';



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

  cargarTurnosXPaciente(pacienteSelect: any){
    let paciente: any;
    this.listaTurnosXpaciente = [];
    
    this.listTurno.forEach(data => {
      if(data.paciente?.id == pacienteSelect?.id &&
        data.estado_turno != 'Pendiente'){
        this.listaTurnosXpaciente.push(data);
        paciente = data.paciente;
      }
    });

    //console.log(this.listaTurnosXpaciente);

    setTimeout(() => {
      this.ExcelService.exportexcel("Datos_Turnos_Paciente_"+paciente?.id+"_", "excel-table-paciente");
    }, 1000);
  }

  seleccionarPaciente(paciente: Paciente){
    //console.log(paciente);
    this.usuarioEvent.emit(paciente);
  }
}
