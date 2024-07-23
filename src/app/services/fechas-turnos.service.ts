import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasTurnosService {

  private fechasTurnos: any = []; //Fecha y Dia
  private fechasTurnosCompleto: any = []; // Fecha, Dia, y Hora

  horarioGeneralLunVier: any = [
    "8:00 a 8:30", "8:30 a 9:00", "9:00 a 9:30", "9:30 a 10:00", "10:00 a 10:30", "10:30 a 11:00", "11:00 a 11:30", "11:30 a 12:00", "12:00 a 12:30", "12:30 a 13:00",
    "13:00 a 13:30", "13:30 a 14:00", "14:00 a 14:30", "14:30 a 15:00", "15:00 a 15:30", "15:30 a 16:00", "16:00 a 16:30", "16:30 a 17:00", "17:00 a 17:30", "17:30 a 18:00",
    "18:00 a 18:30", "18:30 a 19:00"];

  horarioGeneralSab: any = [
    "8:00 a 8:30", "8:30 a 9:00", "9:00 a 9:30", "9:30 a 10:00", "10:00 a 10:30", "10:30 a 11:00", "11:00 a 11:30", "11:30 a 12:00", "12:00 a 12:30", "12:30 a 13:00",
    "13:00 a 13:30", "13:30 a 14:00"
  ];

  constructor() { }

  //Calcula los 15 dias siguientes aparter del dia que saco turno
  calcularFechas(horarioLV: any, horarioS: any): any{
    this.fechasTurnosCompleto = [];
    this.fechasTurnos = [];
    let diasTruno = 15; //Cambiar a 17 xd
  

    for (let index = 0; index < diasTruno; index++) {

      let fechaArray: any = [
        this.obtenerFechasA15Dias(index).toLocaleDateString('es-ES'),
        this.obtenerFechasA15Dias(index).toLocaleDateString('es-ES', { weekday: "long" })];

      this.fechasTurnos.push(fechaArray);
    }
    this.generarFechasConHorarios(horarioLV, horarioS);
    return this.fechasTurnosCompleto;
  }

  private obtenerFechasA15Dias(dias: number): any {
    let fechaHoy = new Date();
    fechaHoy.setDate(fechaHoy.getDate() + dias);
    //console.log(fechaHoy);
    return fechaHoy;
  }

  private obtenerNombreFechasA15Dias(dias: number): any {
    let fechaHoy = new Date();
    fechaHoy.setDate(fechaHoy.getDate() + dias);
    return fechaHoy;
  }


  generarHorasLV(horarioLV: any){
    // let horaInicio = horarioLV[0];//String
    // let horaFinal = horarioLV[1];//String

    // let horaDesde: number = parseInt(horarioLV[0].split(":",2)[0]);//Hora 1, 2 ,3, ...
    // let minutoDesde: number = parseInt(horarioLV[0].split(":",2)[1]);//Minuto 0 o 30
    
    // let horaHasta: number = parseInt(horarioLV[1].split(":",2)[0]);//Hora 1, 2 ,3, ...
    // let minutoHasta: number = parseInt(horarioLV[1].split(":",2)[0]);//Minuto 0 o 30

    // let termino: boolean = true;//finalizador de whilte

    // let horariosLunesViernes: any = []; //Va contener todas las horas con formato '8:30 a 12:00'

    // let armadoDeHoraDesde: string = "";//hora '8:00'
    // let armadoDeHoraHasta: string = "";//hora '12:00'

    // let horaArmado: string = ""; // 'armadoDeHoraDesde a armadoDeHoraHasta'


    // let valor: number = 0;

    
    // while(termino){
      
      
      
      
    //   for (let i = 0; i < 5; i++) {
    //     let horaAnterior: number = horaDesde;
    //     let horaSiguiente: number = horaDesde;
    //     let aux30: number = 30;

    //     if(i%2 == 0){
    //       horaDesde+=i;
    //       console.log(horaDesde + ":" + minutoDesde+ "0"+ " a "+ horaDesde + ":" + aux30);
    //       horaAnterior = horaDesde;
    //       horaSiguiente = horaAnterior+i;
    //     }else{          
    //       horaDesde--;
    //       horaSiguiente = horaAnterior+i;
    //       console.log(horaAnterior + ":" + aux30 + " a "+ horaSiguiente + ":00" );

    //     }
    //     termino = false;
    //   }
    // }



    // console.log("end");


    // console.log("Hora:" + horaDesde);
    // console.log("Minutos:" + minutoDesde);





  }


  private generarFechasConHorarios(horarioLV: any, horarioS: any) {
    let horarioLVGenerado = this.generarHorasLV(horarioLV);

    let horarioLunesViernes: any = [
      "8:00 a 8:30", "8:30 a 9:00", "9:00 a 9:30", "9:30 a 10:00", "10:00 a 10:30", "10:30 a 11:00", "11:00 a 11:30", "11:30 a 12:00", "12:00 a 12:30", "12:30 a 13:00",
      "13:00 a 13:30", "13:30 a 14:00", "14:00 a 14:30", "14:30 a 15:00", "15:00 a 15:30", "15:30 a 16:00", "16:00 a 16:30", "16:30 a 17:00", "17:00 a 17:30", "17:30 a 18:00",
      "18:00 a 18:30", "18:30 a 19:00"];

    let horarioSabado: any = [
      "8:00 a 8:30", "8:30 a 9:00", "9:00 a 9:30", "9:30 a 10:00", "10:00 a 10:30", "10:30 a 11:00", "11:00 a 11:30", "11:30 a 12:00", "12:00 a 12:30", "12:30 a 13:00",
      "13:00 a 13:30", "13:30 a 14:00"
    ];


    let fechas: any = [];

    for (let i = 0; i < this.fechasTurnos.length; i++) {
      
      switch (this.fechasTurnos[i][1]) {
        case "sábado":

          for (let j = 0; j < horarioSabado.length; j++) {           
            let fecha: any = [this.fechasTurnos[i][0], this.fechasTurnos[i][1], horarioSabado[j]];
            fechas.push(fecha);
          }
          break;

        case "domingo":
          //No trabajan
        break;

        default:
          for (let j = 0; j < horarioLunesViernes.length; j++) {
            let fecha: any = [this.fechasTurnos[i][0], this.fechasTurnos[i][1], horarioLunesViernes[j]];
            fechas.push(fecha);
          }
          break;
      }
    }
    //console.log(fechas);

    this.fechasTurnosCompleto = fechas;
  }

}
