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

  constructor(
    private FirestoreService: FirestoreService
  ) { 
    this.FirestoreService.listaPacientes().subscribe(paciente => {
      this.listadoPacientes = paciente;
    });    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }

 

  seleccionarPaciente(paciente: Paciente){
    //console.log(paciente);
    this.usuarioEvent.emit(paciente);
  }
}
