import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { AuthService } from 'src/app/services/auth.service';
import { FechasTurnosService } from 'src/app/services/fechas-turnos.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {
  listEspecialidades: any = [];
  especialidadSelect: boolean = false;
  nombreEspecialidadSelect: string = "";

  horariosLunesViernes_1: any = [
    "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30"];

  horariosLunesViernes_2: any = [
    "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00"];

  horariosSabado_1: any =[
    "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30"
  ];

  horariosSabado_2: any =[
    "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00"
  ];

  // Desde LUNES A VIERNES
  horaDesdeSelect: boolean = false; 
  horaDesdeLV: string = "";
  indiceDesdeLV: any;

  // Hasta LUNES A VIERNES
  horaHastaSelect: boolean = false; 
  horaHastaLV: string = "";
  indiceHastaLV: any;

  // Desde SABADO
  horaDesdeSelectS: boolean = false; 
  horaDesdeS: string = "";
  indiceDesdeS: any;

  // Hasta SABADO
  horaHastaSelectS: boolean = false; 
  horaHastaS: string = "";
  indiceHastaS: any;


  horaDesdeView: string = "";
  horaHastaView: string = "";
  horaDesdeViewS: string = "";
  horaHastaViewS: string = "";

  spinner:boolean = true;

  constructor(
    private AuthService: AuthService,
    private FirestoreService: FirestoreService,
    public FechasTurnosService: FechasTurnosService
  ) {
    this.cargarEspecialidades();
    this.selectEspecialidad(this.AuthService.user.especialidad[0]);

    setTimeout(() => {
      this.spinner = false;
    }, 1500);
  }

  ngOnInit(): void {

  }

  cargarEspecialidades() {
    this.listEspecialidades = this.AuthService.user.especialidad;
  };


  horasinmodificarDesdLV: string = "";
  horasinmodificarHastLV: string = "";
  horasinmodificarDesdS: string = "";
  horasinmodificarHastS: string = "";

  selectEspecialidad(especialidad: string) {
    this.especialidadSelect = true;
    this.nombreEspecialidadSelect = especialidad;

    if(this.AuthService.user.horarioLV != undefined || this.AuthService.user.horarioLV != null){
      if(this.AuthService.user.horarioLV.length != 0 && 
         this.AuthService.user.horarioS.length != 0
         ){
           //console.log("asdasdas");
     
  
          this.horaDesdeView = this.AuthService.user.horarioLV[0].split("a",2)[0].trim();
          //console.log(this.horaDesdeLV);
          // this.horaDesdeLV = this.AuthService.user.horarioLV[0];
          this.horaHastaView = this.AuthService.user.horarioLV[1].split("a",2)[1].trim();
  
          this.horaDesdeViewS = this.AuthService.user.horarioS[0].split("a",2)[0].trim();
          this.horaHastaViewS = this.AuthService.user.horarioS[1].split("a",2)[1].trim();
  
          this.horasinmodificarDesdLV = this.AuthService.user.horarioLV[0];
          this.horasinmodificarHastLV = this.AuthService.user.horarioLV[1];
          this.horasinmodificarDesdS = this.AuthService.user.horarioS[0];
          this.horasinmodificarHastS = this.AuthService.user.horarioS[1];

          this.horaDesdeSelect = true;
          this.horaHastaSelect = true;
          this.horaDesdeSelectS = true; 
          this.horaHastaSelectS = true;  
      }
    }
    //console.log(this.nombreEspecialidadSelect);
  }

  selectHoraDesdeLV(hora: any,indice: any){
    this.horaDesdeView = hora;
    this.horaDesdeLV = hora;
    this.indiceDesdeLV = indice;
    this.horaDesdeSelect = true;

    let horaDespues: number = parseInt(this.horaDesdeLV.split(":",2)[0]);
    let minuto: number = parseInt(this.horaDesdeLV.split(":",2)[1]);
    let aux30: number = 30;

    if(minuto == 0){
      let horaAux = this.horaDesdeLV + " a " + horaDespues+ ":"+aux30;
      //console.log(horaAux);
      this.horaDesdeLV = horaAux;
    }else{
      let horaD = parseInt(this.horaDesdeLV.split(":",2)[0]);
      horaD++;
      let horaAux = horaDespues + ":" + aux30 + " a " + horaD+":"+"00";
      //console.log(horaAux);
      this.horaDesdeLV = horaAux;
    }

    

    this.horariosLunesViernes_2 = [
      "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
      "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
      "18:00", "18:30", "19:00"];

    this.horariosLunesViernes_2.splice(0,indice);
  }
  
  selectHoraHastaLV(hora: any, indice: any){
    this.horaHastaView = hora;
    this.horaHastaLV = hora;
    this.indiceHastaLV = indice;
    this.horaHastaSelect = true;
    
    let horaDespues: number = parseInt(this.horaHastaLV.split(":",2)[0]);
    let minuto: number = parseInt(this.horaHastaLV.split(":",2)[1]);
    let aux30: number = 30;

    if(horaDespues != 19){
      if(minuto == 0){
        horaDespues--;
        let horaAux = horaDespues+ ":"+aux30 + " a " + this.horaHastaLV;
         //console.log(horaAux);
        this.horaHastaLV = horaAux;
      }else{
        let horaD = parseInt(this.horaHastaLV.split(":",2)[0]);
        horaD == horaD-1;
        let horaAux = horaD+":"+"00" + " a " + horaDespues + ":" + aux30;
         //console.log(horaAux);
        this.horaHastaLV = horaAux;
      }
    }else{
      let horaAux = "18:30 a 19:00";
      this.horaHastaLV = horaAux;
       //console.log(horaAux);
    }

  }


  selectHoraDesdeS(hora:any, indice: any){
    this.horaDesdeS = hora;
    this.horaDesdeViewS = hora;
    this.indiceDesdeS = indice;
    this.horaDesdeSelectS = true;


    let horaDespues: number = parseInt(this.horaDesdeS.split(":",2)[0]);
    let minuto: number = parseInt(this.horaDesdeS.split(":",2)[1]);
    let aux30: number = 30;

    if(minuto == 0){
      let horaAux = this.horaDesdeS + " a " + horaDespues+ ":"+aux30;
      // console.log(horaAux);
      this.horaDesdeS = horaAux;
    }else{
      let horaD = parseInt(this.horaDesdeS.split(":",2)[0]);
      horaD++;
      let horaAux = horaDespues + ":" + aux30 + " a " + horaD+":"+"00";
      // console.log(horaAux);
      this.horaDesdeS = horaAux;
    }


    this.horariosSabado_2 = [
      "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
      "13:00", "13:30", "14:00"
    ];

    this.horariosSabado_2.splice(0,indice);
  }

  selectHoraHastaS(hora:any, indice: any){
    this.horaHastaS = hora;
    this.horaHastaViewS = hora;
    this.indiceHastaS = indice;
    this.horaHastaSelectS = true; 

    let horaDespues: number = parseInt(this.horaHastaS.split(":",2)[0]);
    let minuto: number = parseInt(this.horaHastaS.split(":",2)[1]);
    let aux30: number = 30;

    if(horaDespues != 19){
      if(minuto == 0){
        horaDespues--;
        let horaAux = horaDespues+ ":"+aux30 + " a " + this.horaHastaS;
        //  console.log(horaAux);
        this.horaHastaS = horaAux;
      }else{
        let horaD = parseInt(this.horaHastaS.split(":",2)[0]);
        horaD == horaD-1;
        let horaAux = horaD+":"+"00" + " a " + horaDespues + ":" + aux30;
        //  console.log(horaAux);
        this.horaHastaS = horaAux;
      }
    }else{
      let horaAux = "13:30 a 14:00";
      this.horaHastaS = horaAux;
       //console.log(horaAux);
    }
  }


  subirHorarios(){
    let especialista = this.AuthService.user;

    if(this.horaDesdeLV == ''){
      this.horaDesdeLV = this.horasinmodificarDesdLV;
    }

    if(this.horaHastaLV == ''){
      this.horaHastaLV = this.horasinmodificarHastLV;
    }

    if(this.horaDesdeS == ''){
      this.horaDesdeS = this.horasinmodificarDesdS;
    }

    if(this.horaHastaS == ''){
      this.horaHastaS = this.horasinmodificarHastS;
    }

    especialista.horarioLV = [this.horaDesdeLV, this.horaHastaLV];
    especialista.horarioS = [this.horaDesdeS, this.horaHastaS];

    
    // console.log(especialista.horarioLV);
    // console.log(especialista.horarioS);
    this.FirestoreService.modificarEspecialista(especialista,especialista.id);
    this.msjTurnoSuccess();
  }
  
  msjTurnoSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Modificacion Exitosa',
      text: `Se a modificado el horario laboral`,
      confirmButtonText: 'Aceptar'
    }).then((result) => {

    });
  }

}