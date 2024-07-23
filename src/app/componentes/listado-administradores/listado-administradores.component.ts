import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Administrador } from 'src/app/classes/administrador';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-listado-administradores',
  templateUrl: './listado-administradores.component.html',
  styleUrls: ['./listado-administradores.component.css']
})
export class ListadoAdministradoresComponent implements OnInit {

  @Output() usuarioEvent = new EventEmitter<any>();

  listadoAdministradores: any = "";
  spinner:boolean = true;

  constructor(
    private FirestoreService: FirestoreService
  ) { 
    this.FirestoreService.listaAdministradores().subscribe(administrador => {
      this.listadoAdministradores = administrador;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }

  seleccionarPaciente(administrador: Administrador){
    //console.log(administrador);
    this.usuarioEvent.emit(administrador);
  }

}
