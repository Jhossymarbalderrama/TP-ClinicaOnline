import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  listTurnos: any = [];
  listTurnosCaragos: any = [];

  filtroNombreEspecialista: string = "";
  filtroApellidoEspecialista: string = "";
  filtroEspecialidad: string = "";

  closeResult: any;
  auxComentario: string = "";
  commentarioCancelacion: string = "";
  datosTurnoSeleccionado: any;

  spinner: boolean = true;

  constructor(
    private FirestoreService:FirestoreService,
    private modalService: NgbModal  
  ) {
    this.FirestoreService.listaTurnos().subscribe(value =>{
      this.listTurnos = value;
      this.cargarTurnos();
    });
    
    setTimeout(() => {
      this.spinner = false;
    }, 1500);
  }

  cargarTurnos(){   
    this.listTurnosCaragos = []; 
    this.listTurnos.forEach((value: any) => {    
      this.listTurnosCaragos.push(value);
    });
  }

  ngOnInit(): void {
  }

  cancelarTurno(turno: any, content: any){
    this.datosTurnoSeleccionado = turno;
    this.open(content);
    // console.log(this.datosTurnoSeleccionado);
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {  
        this.commentarioCancelacion = this.auxComentario;
        this.auxComentario = "";   
        //Cancelo el turno
        this.datosTurnoSeleccionado.estado_turno = "Cancelado";
        this.datosTurnoSeleccionado.comentario_cancelacion = this.commentarioCancelacion;

        this.FirestoreService.modificarTurno(this.datosTurnoSeleccionado,this.datosTurnoSeleccionado.id);

				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
      this.auxComentario = "";
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.auxComentario = "";
			return 'by clicking on a backdrop';
		} else {
      this.auxComentario = "";
			return `with: ${reason}`;
		}
	}
}
