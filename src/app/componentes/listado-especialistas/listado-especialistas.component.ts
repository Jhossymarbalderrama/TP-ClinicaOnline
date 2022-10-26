import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})
export class ListadoEspecialistasComponent implements OnInit {

  @Output() usuarioEvent = new EventEmitter<any>();

  listadoEspecialistas: any = "";
  spinner:boolean = true;

  constructor(
    private FirestoreService: FirestoreService
  ) { 
    this.FirestoreService.listaEspecialistas().subscribe(especialista => {
      this.listadoEspecialistas = especialista;
      //console.log(especialista);
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

  cambiarEstadoEspecialista(especialista: any){
      especialista.habilitado = !especialista.habilitado;
      this.FirestoreService.modificarEspecialista(especialista,especialista.id);
  }
}
