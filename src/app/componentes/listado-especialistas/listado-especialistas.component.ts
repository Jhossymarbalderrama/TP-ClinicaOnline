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
  spinner: boolean = true;

  listaTurnosXespecialista: any = [];
  listTurno: any = [];

  constructor(
    private FirestoreService: FirestoreService,
    private ExcelService: ExcelService
  ) {
    this.FirestoreService.listaEspecialistas().subscribe(especialista => {
      this.listadoEspecialistas = especialista;
    });

    this.FirestoreService.listaTurnos().subscribe(turnos => {
      this.listTurno = turnos;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
  seleccionarPaciente(especialista: Especialista) {
    this.usuarioEvent.emit(especialista);
  }

  cambiarEstadoEspecialista(especialista: any) {
    especialista.habilitado = !especialista.habilitado;
    this.FirestoreService.modificarEspecialista(especialista, especialista.id);
  }
}
