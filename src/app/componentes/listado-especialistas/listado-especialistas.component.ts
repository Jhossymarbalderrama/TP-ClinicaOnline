import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialista } from 'src/app/classes/especialista';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})
export class ListadoEspecialistasComponent implements OnInit {

  @Output() usuarioEvent = new EventEmitter<any>();

  listadoEspecialistas: any = "";
  spinner:boolean = true;

  listaTurnosXespecialista: any = [];
  listTurno: any = [];

  constructor(
    private FirestoreService: FirestoreService,
    private ExcelService: ExcelService
  ) { 
    this.FirestoreService.listaEspecialistas().subscribe(especialista => {
      this.listadoEspecialistas = especialista;
      //console.log(especialista);
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

  seleccionarPaciente(especialista: Especialista){
    //console.log(especialista);
    this.usuarioEvent.emit(especialista);
  }


  cargarTurnosXPaciente(especialistaSelect: any){
    let especialista: any;
    this.listaTurnosXespecialista = [];
    
    this.listTurno.forEach(data => {
      if(data.especialista?.id == especialistaSelect?.id &&
        data.estado_turno != 'Pendiente'){
        this.listaTurnosXespecialista.push(data);
        especialista = data.especialista;
      }
    });

    //console.log(this.listaTurnosXpaciente);

    setTimeout(() => {
      this.ExcelService.exportexcel("Datos_Turnos_Especialista_"+especialista?.id+"_", "excel-table-especialista");
    }, 1000);
  }

  cambiarEstadoEspecialista(especialista: any){
      especialista.habilitado = !especialista.habilitado;
      this.FirestoreService.modificarEspecialista(especialista,especialista.id);
  }
}
