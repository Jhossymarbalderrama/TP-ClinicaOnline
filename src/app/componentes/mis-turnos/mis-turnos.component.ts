import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  listTurnos: any = [];
  listTurnosCargados: any = [];

  filtroNombrePaciente: string = "";
  filtroApellidoPaciente: string = "";

  filtroNombreEspecialista: string = "";
  filtroApellidoEspecialista: string = "";
  filtroEspecialidad: string = "";

  closeResult: any;
  auxComentario: string = "";
  commentarioCancelacion: string = "";
  datosTurnoSeleccionado: any;


  reseneaTurno: string = "";

  spinner: boolean = true;

  constructor(
    public AuthService: AuthService,
    private FirestoreService: FirestoreService,
    private modalService: NgbModal
  ) {
    this.FirestoreService.listaTurnos().subscribe(value => {
      this.listTurnos = value;
      if (this.AuthService.user.tipoUsuario == 'PAC') {
        this.cargarTurnosPacientes();
      }

      if (this.AuthService.user.tipoUsuario == 'ESP') {
        this.cargarTurnosEspecialista();
      }
    });

    setTimeout(() => {
      this.spinner = false;
    }, 1700);
    //console.log(this.listTurnosCargados);
  }

  cargarTurnosPacientes() {
    this.listTurnosCargados = [];
    this.listTurnos.forEach((value: any) => {
      if (value.paciente.id == this.AuthService.user.id) {
        this.listTurnosCargados.push(value);
      }
    });
  }

  cargarTurnosEspecialista() {
    this.listTurnosCargados = [];
    this.listTurnos.forEach((value: any) => {
      if (value.especialista.id == this.AuthService.user.id) {
        this.listTurnosCargados.push(value);
      }
    });
  }

  cancelarTurno(turno: any, content: any) {
    this.datosTurnoSeleccionado = turno;
    this.open(content);
    // console.log(this.datosTurnoSeleccionado);
  }

  verResenea(turno: any, contentResenea: any) {
    if (turno.resenea != '') {
      this.reseneaTurno = turno.resenea;
    }
    this.openResenea(contentResenea);
  }

  hacerEncuesta(turno: any, contentEncuesta: any) {
    this.datosTurnoSeleccionado = turno;
    this.openEncuesta(contentEncuesta);
  }

  hacerCalificacion(turno: any, contentCalificacion: any) {
    this.datosTurnoSeleccionado = turno;
    this.openCalificacion(contentCalificacion);
  }

  comentarioRechazarTurno: string = "";
  rechazarTurno(turno: any, contentRechazo: any){
    this.datosTurnoSeleccionado = turno;
    this.openRechazoTurno(contentRechazo);
  }

  aceptarTurno(turno:any){
    let datosTurno = turno;

    datosTurno.estado_turno = "Aceptado";
    this.FirestoreService.modificarTurno(datosTurno,  datosTurno.id);
  }

  
  finalizarTurno(turno: any, reseneaDiagnostico: any){
    this.datosTurnoSeleccionado = turno;
    this.openReseneaDiagnosticoEsp(reseneaDiagnostico);
  }

  ngOnInit(): void {
    //console.log(this.listTurnosCargados);
  }

  // eliminarRepetidos(){
  //   let result = [];

  //   result = this.listTurnosCargados.filter((item:any,index:any) =>{
  //     return this.listTurnosCargados(item) === index;
  //   });

  //   this.listTurnosCargados = result;
  // }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.commentarioCancelacion = this.auxComentario;
        this.auxComentario = "";
        //Cancelo el turno
        this.datosTurnoSeleccionado.estado_turno = "Cancelado";
        this.datosTurnoSeleccionado.comentario_cancelacion = this.commentarioCancelacion;

        this.FirestoreService.modificarTurno(this.datosTurnoSeleccionado, this.datosTurnoSeleccionado.id);
        this.listTurnosCargados = [];
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openRechazoTurno(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.commentarioCancelacion = "Turno Rechazado por el especialista, motivos: " + this.comentarioRechazarTurno;
        this.comentarioRechazarTurno = "";
        //Rechazo Turno
        this.datosTurnoSeleccionado.estado_turno = "Rechazado";
        this.datosTurnoSeleccionado.comentario_cancelacion = this.commentarioCancelacion;

        this.FirestoreService.modificarTurno(this.datosTurnoSeleccionado, this.datosTurnoSeleccionado.id);
        this.listTurnosCargados = [];
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openResenea(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }


  currentRate = 5;
  pregunta_1_encuesta: string = "";

  openEncuesta(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        
        let turno = this.datosTurnoSeleccionado;

        let encuesta = {
          calificacion: this.currentRate,
          pregunta: this.pregunta_1_encuesta
        }

        turno.encuesta = encuesta;

        this.FirestoreService.modificarTurno(turno, turno.id);

        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  encuestaTexto: string = "";
  openCalificacion(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        let tunrnoSelect = this.datosTurnoSeleccionado;
        let encuesta = this.encuestaTexto;

        this.encuestaTexto = "";

        tunrnoSelect.calificacion_atencion = encuesta;

        this.FirestoreService.modificarTurno(tunrnoSelect, tunrnoSelect.id);

        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  reseneaDiagnosticoEsp: string = "";
  openReseneaDiagnosticoEsp(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        let turnoSelect = this.datosTurnoSeleccionado;
        turnoSelect.resenea = "Diagnostico: " +this.reseneaDiagnosticoEsp;
        turnoSelect.estado_turno = "Realizado";        
        this.FirestoreService.modificarTurno(turnoSelect, turnoSelect.id);

        this.reseneaDiagnosticoEsp = "";
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
