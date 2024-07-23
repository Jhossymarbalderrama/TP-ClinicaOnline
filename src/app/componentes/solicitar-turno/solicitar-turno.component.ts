import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FechasTurnosService } from 'src/app/services/fechas-turnos.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Turno } from 'src/app/classes/turno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  listadoEspecialistas: any = "";
  listadoEspecialidad: any = [];
  listadoPacientes: any = [];

  especialistaSelect: boolean = false;
  especialidadSelect: boolean = false;
  fechaSelect: boolean = false;
  pacienteSelect: boolean = false;


  fechaSolaSelect: boolean = false;
  horaSolaSelect: boolean = false;


  nombreEspecialidadSelect: string = "";
  idEspecialista: string = "";
  fechaSeleccionada: string = "";
  pacienteSeleccionado: any;

  fechas: any = [];
  fechasOcupadas: any = [];
  fechasOcupadasLocal: any = [];

  turno: Turno = new Turno("", "", "", [], "", "", "", "");

  filtroXEspecialidad: string = "";
  errorFormularioTurno: boolean = false;
  spinnerFechas: boolean = false;

  spinner: boolean = true;

  imgCardiologia: string = "../../../assets/imagenes/especialidades/cardiologia.png";
  imgPediatria: string = "../../../assets/imagenes/especialidades/pediatria.png";
  imgNeumologia: string = "../../../assets/imagenes/especialidades/neumologia.png";
  imgDefault: string = "../../../assets/imagenes/especialidades/default.png";



  horasEspecialistaLV: string = "";
  horasEspecialistaS: string = "";

  horaSola: string = "";

  horasDisponiblesXdia: any = [];
  fechasola: any = [];

  fechasDisponibles: any = [];

  constructor(
    public AuthService: AuthService,
    private FirestoreService: FirestoreService,
    private FechasTurnosService: FechasTurnosService
  ) { }

  ngOnInit(): void {
    this.FirestoreService.listaEspecialistas().subscribe(especialista => {
      this.listadoEspecialistas = especialista;
      this.cargarEspecialidad();
    });

    this.FirestoreService.listaTurnos().subscribe(turnos => {
      this.fechasOcupadas = turnos;
      this.cargarFechasOcupadas();
    });

    this.FirestoreService.listaPacientes().subscribe(pacientes => {
      this.listadoPacientes = pacientes;
    });

    if (this.AuthService.user.tipoUsuario != 'ADM') {
      let datosUsuario: any = {
        id: this.AuthService.user.id,
        nombre: this.AuthService.user.nombre,
        apellido: this.AuthService.user.apellido,
        edad: this.AuthService.user.edad,
        dni: this.AuthService.user.dni,
        mail: this.AuthService.user.mail,
        obra_social: this.AuthService.user.obra_social
      }
      this.turno.paciente = datosUsuario;
    }

    setTimeout(() => {
      this.spinner = false;
    }, 1500);
  }


  /**
   * 
   */
  cargarEspecialidad() {
    for (var i = 0; i < this.listadoEspecialistas.length; i++) {

      const elemento = this.listadoEspecialistas[i].especialidad;
      for (let j = 0; j < elemento.length; j++) {
        if (!this.listadoEspecialidad.includes(this.listadoEspecialistas[i].especialidad[j])) {
          this.listadoEspecialidad.push(elemento[j]);
        }
      }
    }
  }

  /**
   * 
   */
  cargarFechasOcupadas() {
    for (var i = 0; i < this.fechasOcupadas.length; i++) {
      this.fechasOcupadasLocal.push(this.fechasOcupadas[i].fecha);
    }
  }


  /**
   * LLamo a esto cuando este Seleccionado la Especialidad y Especialista
   */
  verificacionFechasHabilitadas() {
    let horasLV = this.horasEspecialistaLV;
    let horasS = this.horasEspecialistaLV;

    // ? Por especialista y especialidad  
    if (this.especialidadSelect && this.especialistaSelect) {

      this.fechas = this.FechasTurnosService.calcularFechas(this.horasEspecialistaLV, this.horasEspecialistaLV);
      let fOcupadaXEspecialista: any = [];

      // ? Guardo las fechas que tiene turno el especialista seleccionado
      for (let j = 0; j < this.fechasOcupadas.length; j++) {
        if (this.fechasOcupadas[j].especialista.id == this.idEspecialista) {
          if (this.fechasOcupadas[j].estado_turno == 'Pendiente' ||
            this.fechasOcupadas[j].estado_turno == 'Aceptado' ||
            this.fechasOcupadas[j].estado_turno == 'Realizado' ||
            this.fechasOcupadas[j].estado_turno == 'Finalizado') {
            fOcupadaXEspecialista.push(this.fechasOcupadas[j].fecha);
          }
        }
      }

      // ? Filtar el calendario general con los horarios del especialista
      let auxHorariosLibresXespecialista: any = [];
      let auxS: boolean = false;
      let auxLV: boolean = false;

      for (let k = 0; k < this.fechas.length; k++) {
        if (this.fechas[k][1] == "sábado") {

          if (this.fechas[k][2] == horasS[0]) {
            auxS = true;
          }

          if (this.fechas[k][2] == horasS[1]) {
            auxHorariosLibresXespecialista.push(this.fechas[k]);
            auxS = false;
          }

          if (auxS) {
            auxHorariosLibresXespecialista.push(this.fechas[k]);
          }
        }

        if (this.fechas[k][2] != "sábado") {
          if (this.fechas[k][2] == horasLV[0]) {
            auxLV = true;
          }

          if (this.fechas[k][2] == horasLV[1]) {
            auxHorariosLibresXespecialista.push(this.fechas[k]);
            auxLV = false;
          }

          if (auxLV) {
            auxHorariosLibresXespecialista.push(this.fechas[k]);
          }
        }
      }
      this.fechas = auxHorariosLibresXespecialista;

      // ? Filtro el calendario general con las fechas de turno del especialista
      for (let i = 0; i < this.fechas.length; i++) {
        for (let j = 0; j < fOcupadaXEspecialista.length; j++) {
          if (this.fechas[i][0] == fOcupadaXEspecialista[j][0] &&
            this.fechas[i][2] == fOcupadaXEspecialista[j][2]
          ) {
            this.fechas.splice(i, 1);
          }
        }
      }
    }

    this.generoFechasxDia();
  }



  /**
   * 
   * @param especialista 
   */
  selectEspecialista(especialista: any) {
    this.fechaSolaSelect = false;
    this.horasDisponiblesXdia = "";
    this.especialistaSelect = true;
    this.idEspecialista = especialista.id;

    let datosEspecialista = {
      id: especialista.id,
      nombre: especialista.nombre,
      apellido: especialista.apellido,
      dni: especialista.dni,
      especialidad: especialista.especialidad,
      mail: especialista.mail,
      horarioLV: especialista.horarioLV,
      horarioS: especialista.horarioS
    }

    this.horasEspecialistaLV = especialista.horarioLV;
    this.horasEspecialistaS = especialista.horarioS;

    // this.turno.especialista = especialista.nombre + " " + especialista.apellido;
    this.turno.especialista = datosEspecialista;
    this.verificacionFechasHabilitadas();
  }


  /**
   * 
   * @param especialidad 
   */
  selectEspecialidad(especialidad: string) {
    this.horasDisponiblesXdia = "";
    this.especialistaSelect = false;
    this.especialidadSelect = true;
    this.nombreEspecialidadSelect = especialidad;
    this.turno.especialidad = especialidad;

    this.filtroXEspecialidad = especialidad;

    //this.verificacionFechasHabilitadas();    
  }
 
  
  /**
   * Capturo la fecha y hora
   * @param hora 
   */
  selectFecha(hora: any) {
    this.horaSolaSelect = true;
    this.horaSola = hora;
    this.fechaSelect = true;
    let fechaConHora: any = [this.fechasola[0], this.fechasola[1], hora]
    this.fechaSeleccionada = fechaConHora;
    this.turno.fecha = fechaConHora;
    //console.log(this.turno.fecha);
  }


  /**
   * 
   * @param paciente 
   */
  selectPaciente(paciente: any) {
    let datosUsuario: any = {
      id: paciente.id,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      edad: paciente.edad,
      dni: paciente.dni,
      mail: paciente.mail,
      obra_social: paciente.obra_social
    }
    this.turno.paciente = datosUsuario;
    this.pacienteSeleccionado = datosUsuario;
    this.pacienteSelect = true;
  }


  /**
   * 
   */
  generarTurno() {
    if (this.especialistaSelect && this.especialidadSelect && this.fechaSelect && this.pacienteSelect) {

      let datosTurno: any = {
        paciente: this.turno.paciente,
        especialidad: this.turno.especialidad,
        especialista: this.turno.especialista,
        fecha: this.turno.fecha,
        estado_turno: "Pendiente",
        resenea: this.turno.resenea,
        encuesta: this.turno.encuesta,
        calificacion_atencion: this.turno.calificacion_atencion
      }

      this.FirestoreService.altaTurno(datosTurno);
      this.msjTurnoSuccess();
      console.log(this.turno);
    } else if (this.especialistaSelect && this.especialistaSelect && this.fechaSelect && this.AuthService.user.tipoUsuario == 'PAC') {
      let datosTurno: any = {
        paciente: this.turno.paciente,
        especialidad: this.turno.especialidad,
        especialista: this.turno.especialista,
        fecha: this.turno.fecha,
        estado_turno: "Pendiente",
        resenea: this.turno.resenea,
        encuesta: this.turno.encuesta,
        calificacion_atencion: this.turno.calificacion_atencion
      }

      this.FirestoreService.altaTurno(datosTurno);
      this.msjTurnoSuccess();
      //console.log(this.turno);
    }
    else {
      this.errorFormularioTurno = true;
    }
  }
  
  /**
   * Genero un array de las horas disponibles por fecha
   * @param fecha 
   */
  buscoHorasXFecha(fecha: any) {
    this.fechaSolaSelect = true;
    this.horasDisponiblesXdia = [];
    this.fechasola = [];
    this.fechasola = fecha;
    this.horaSolaSelect = false;  
    let auxHoras: any = [];

    /**
     * ? En el array de arriba lleno con los valores 
     * ? de horas iguales de la colleccion fechas comparadas con la coleecion fechasDisponibles
     */
    for (let i = 0; i < this.fechas.length; i++) {
      if (this.fechas[i][0] == this.fechasola[0] &&
        this.fechas[i][1] == this.fechasola[1]) {
        auxHoras.push(this.fechas[i][2]);
      }
    }

    this.horasDisponiblesXdia = auxHoras.filter((item: any, index: any) => {
      return auxHoras.indexOf(item) === index;
    });
  }

  
  /**
   * Genero un array de los dias que tengo disponible sin repetir fecha
   */
  generoFechasxDia() {
    this.fechasDisponibles = [];

    for (let i = 0; i < this.fechas.length - 1; i++) {
      if (i != this.fechas.length) {
        if (this.fechas[i][0] != this.fechas[i + 1][0] &&
          this.fechas[i][1] != this.fechas[i + 1][1]) {
          let fecha = [this.fechas[i][0], this.fechas[i][1]];
          this.fechasDisponibles.push(fecha);
        }
      }
    }

    let fecha = [this.fechas[this.fechas.length - 1][0], this.fechas[this.fechas.length - 1][1]];
    this.fechasDisponibles.push(fecha);
  }

  /**
   * Mensaje de Estado de Turno
   */
  msjTurnoSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Turno sacado con exito',
      text: `Puede verificar el estado de su turno en la seccion Mis Turnos`,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      this.especialistaSelect = false;
      this.especialidadSelect = false;
      this.fechaSelect = false;
      this.idEspecialista = "";
      this.nombreEspecialidadSelect = "";
      this.fechaSeleccionada = "";
    });
  }
}
