import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

import { ApexAxisChartSeries, ChartComponent } from "ng-apexcharts";

import Chart from 'chart.js/auto';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-charts-administrador',
  templateUrl: './charts-administrador.component.html',
  styleUrls: ['./charts-administrador.component.css']
})
export class ChartsAdministradorComponent implements OnInit {

  listaLogUsuarios: any = [];
  listaTurnos: any = [];
  listaEspecialistas: any = [];

  listaEspecialidades: any = [];
  cantTurnosXEspecialidad: any = [];

  // Pie Chart
  chartPie: any;
  dataChartPie: any;
  configChartPie: any;


  // Bar Chart
  chartBar: any;
  dataChartBar: any;
  configChartBar: any;
  cantTurnoXDia: any = [0, 0, 0, 0, 0, 0];


  // Line Chart
  chartLine: any;
  dataChartLine: any;
  configChartLine: any;

  listMedicos: any = [];
  cantTurnosPendientesXmedico: any = [];

  // Bar Horizontal Chart
  chartBarY: any;
  dataChartBarY: any;
  configChartBarY: any;
  cantTurnosFinalizadoXmedico: any = [];


  horario: any = [
    "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00"];


  constructor(
    private FirestoreService: FirestoreService
  ) {
    this.FirestoreService.listaLogUsuarios().subscribe(log => {
      this.listaLogUsuarios = log;
    });

    this.FirestoreService.listaTurnos().subscribe(turnos => {
      this.listaTurnos = turnos;
    });

    this.FirestoreService.listaEspecialistas().subscribe(especialistas => {
      this.listaEspecialistas = especialistas;
      this.cargarEspecialidades();
    });

  }


  ngOnInit(): void {
  }

  SeleccionDesde2: any = '8:00';
  opcionSeleccionadoDesde2: any;
  capturar2Desde() {
    this.SeleccionDesde2 = this.opcionSeleccionadoDesde2;
    this.modificarChartFinalizadosXmedico();
  }

  SeleccionHasta2: any = '19:00';
  opcionSeleccionadoHasta2: any;
  capturar2Hasta() {
    this.SeleccionHasta2 = this.opcionSeleccionadoHasta2;
    this.modificarChartFinalizadosXmedico();
  }


  SeleccionDesde1: any = '8:00';
  opcionSeleccionadoDesde1: any;
  capturar1Desde() {
    this.SeleccionDesde1 = this.opcionSeleccionadoDesde1;   
    this.modificarChartSolicitadosXmedico();
  }

  SeleccionHasta1: any = '19:00';
  opcionSeleccionadoHasta1: any;
  capturar1Hasta() {
    this.SeleccionHasta1 = this.opcionSeleccionadoHasta1;
    this.modificarChartSolicitadosXmedico();
  }


  cargarEspecialidades() {
    this.listaEspecialidades = [];
    this.listMedicos = [];

    this.listaEspecialistas.forEach(data => {
      this.listaEspecialidades.push(data.especialidad[0]);
      this.listMedicos.push(data.apellido + " " + data.nombre);
    });

    let result = this.listaEspecialidades.filter((item, index) => {
      return this.listaEspecialidades.indexOf(item) === index;
    });
    this.listaEspecialidades = result;



    let auxMedico = this.listMedicos.filter((item, index) => {
      return this.listMedicos.indexOf(item) === index;
    });
    this.listMedicos = auxMedico;



    setTimeout(() => {
      this.cantTurnoXDia = [0, 0, 0, 0, 0, 0];

      for (let i = 0; i < this.listaEspecialidades.length; i++) {
        let cont = 0;
        this.listaTurnos.forEach(turno => {
          if (this.listaEspecialidades[i] == turno.especialidad) {
            cont++;
            this.cantTurnosXEspecialidad[i] = cont;
          }
        });
      }


      this.listaTurnos.forEach(turno => {
        switch (turno.fecha[1]) {
          case 'lunes':
            this.cantTurnoXDia[0]++;
            break;
          case 'martes':
            this.cantTurnoXDia[1]++;
            break;
          case 'miércoles':
            this.cantTurnoXDia[2]++;
            break;
          case 'jueves':
            this.cantTurnoXDia[3]++;
            break;
          case 'viernes':
            this.cantTurnoXDia[4]++;
            break;
          case 'sábado':
            this.cantTurnoXDia[5]++;
            break;
        }
      });




      for (let i = 0; i < this.listMedicos.length; i++) {
        let contPendiente = 0;
        let contFinalizado = 0;

        this.listaTurnos.forEach(turno => {

          //Solicitado
          if (this.listMedicos[i] == (turno.especialista.apellido + ' ' + turno.especialista.nombre) && turno.estado_turno == 'Pendiente') {
            contPendiente++;
            this.cantTurnosPendientesXmedico[i] = contPendiente;
          } else if (this.listMedicos[i] != (turno.especialista.apellido + ' ' + turno.especialista.nombre) &&
            contPendiente == 0 && turno.estado_turno == 'Pendiente') {
            this.cantTurnosPendientesXmedico[i] = contPendiente;
          }

          if (this.listMedicos[i] == (turno.especialista.apellido + ' ' + turno.especialista.nombre) && turno.estado_turno == 'Realizado') {
            contFinalizado++;
            this.cantTurnosFinalizadoXmedico[i] = contFinalizado;
          } else if (this.listMedicos[i] != (turno.especialista.apellido + ' ' + turno.especialista.nombre) &&
            contFinalizado == 0 && turno.estado_turno == 'Realizado') {
            this.cantTurnosFinalizadoXmedico[i] = contFinalizado;
          }

        });
      }


      this.cargarChartTurnosXespecialidad();
      this.cargarCharBarCantTurnosXdia();
      //this.cantTurnosSolicitadosXMedico();
      //this.cantTurnosFinalizadosXMedico();  
      this.modificarChartSolicitadosXmedico();
      this.modificarChartFinalizadosXmedico();
    }, 1000);
  }

  cargarChartTurnosXespecialidad() {
    let listEspecialidades = this.listaEspecialidades;
    let cntXEspecialidades = this.cantTurnosXEspecialidad;


    this.dataChartPie = {
      labels: listEspecialidades,
      datasets: [{
        label: 'Cantidad Turnos',
        data: cntXEspecialidades,
        hoverOffset: 4
      }]
    };

    this.configChartPie = {
      type: 'pie',
      data: this.dataChartPie,
    };

    this.chartPie = new Chart("turnosXespecialidad",
      this.configChartPie
    );
  }

  cargarCharBarCantTurnosXdia() {

    this.dataChartBar = {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
      datasets: [{
        label: 'Cantidad de Turnos: ',
        data: this.cantTurnoXDia,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 2
      }]
    };

    this.configChartBar = {
      type: 'bar',
      data: this.dataChartBar,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    this.chartBar = new Chart("CantTurnosXdia",
      this.configChartBar
    );
  }


  cantTurnosSolicitadosXMedico() {

    this.dataChartLine = {
      labels: this.listMedicos,
      datasets: [{
        label: 'Turnos Solicitados por Medico: ',
        data: this.cantTurnosPendientesXmedico,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.0
      }]
    };

    this.configChartLine = {
      type: 'line',
      data: this.dataChartLine,
    };


    let charExiste = Chart.getChart('CantTurnosSolicitadoPorMedico');
    if (charExiste != undefined)  {
      charExiste.destroy(); 
    }

    this.chartLine = new Chart("CantTurnosSolicitadoPorMedico",
      this.configChartLine
    );
    
  }


  cantTurnosFinalizadosXMedico() {
    this.dataChartBarY = {
      labels: this.listMedicos,
      datasets: [{
        axis: 'y',
        label: 'Turnos Finalizados por Medico',
        data: this.cantTurnosFinalizadoXmedico,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 2
      }]
    };

    this.configChartBarY = {
      type: 'bar',
      data: this.dataChartBarY,
      options: {
        indexAxis: 'y',
      }
    };

    let charExiste = Chart.getChart('CantTurnosFinalizadoXmedico');
    if (charExiste != undefined)  {
      charExiste.destroy(); 
    }
    
    this.chartBarY = new Chart("CantTurnosFinalizadoXmedico",
    this.configChartBarY
    );

    //console.log(this.chartBarY);
    
  }


  modificarChartFinalizadosXmedico() {
    let aux: any;
    this.dataChartBarY = aux;
    this.configChartBarY = aux;
    this.cantTurnosFinalizadoXmedico = [];

    let horaSelectDesde2;

    if (this.SeleccionDesde2) {
      horaSelectDesde2 = this.SeleccionDesde2.split(":", 2);
    } else {
      horaSelectDesde2 = ["8", "00"];
    }

    let horaSelectHasta2;
    if (this.SeleccionHasta2) {
      horaSelectHasta2 = this.SeleccionHasta2.split(":", 2);
    } else {
      horaSelectHasta2 = ["19", "00"];
    }

    horaSelectDesde2 = parseInt(horaSelectDesde2[0] + horaSelectDesde2[1]);
    horaSelectHasta2 = parseInt(horaSelectHasta2[0] + horaSelectHasta2[1]);


    for (let i = 0; i < this.listMedicos.length; i++) {
      let contFinalizado = 0;
      this.listaTurnos.forEach(turno => {
        if (this.listMedicos[i] == (turno.especialista.apellido + ' ' + turno.especialista.nombre) && turno.estado_turno == 'Realizado') {
          let hora = (turno.fecha[2]).split("a", 1);
          let horasolo = hora[0].trim();
          horasolo = horasolo.split(':', 2);
          let horaNumber = (parseInt(horasolo[0] + horasolo[1]));

          if (horaNumber >= horaSelectDesde2 && horaNumber <= horaSelectHasta2) {
            contFinalizado++;
            //console.log("a");
            this.cantTurnosFinalizadoXmedico[i] = contFinalizado;
          }
        } else if (this.listMedicos[i] != (turno.especialista.apellido + ' ' + turno.especialista.nombre) &&
          contFinalizado == 0 && turno.estado_turno == 'Realizado') {
          this.cantTurnosFinalizadoXmedico[i] = contFinalizado;
        }
      });
    }
    
    this.cantTurnosFinalizadosXMedico(); 
  }



  modificarChartSolicitadosXmedico(){
    let aux: any;

    this.dataChartLine = aux;
    this.configChartLine = aux;
    this.cantTurnosPendientesXmedico = [];

    let horaSelectDesde2;

    if (this.SeleccionDesde1) {
      horaSelectDesde2 = this.SeleccionDesde1.split(":", 2);
    } else {
      horaSelectDesde2 = ["8", "00"];
    }

    let horaSelectHasta2;
    if (this.SeleccionHasta1) {
      horaSelectHasta2 = this.SeleccionHasta1.split(":", 2);
    } else {
      horaSelectHasta2 = ["19", "00"];
    }

    horaSelectDesde2 = parseInt(horaSelectDesde2[0] + horaSelectDesde2[1]);
    horaSelectHasta2 = parseInt(horaSelectHasta2[0] + horaSelectHasta2[1]);

    // console.log(horaSelectDesde2);
    // console.log(horaSelectHasta2);


    for (let i = 0; i < this.listMedicos.length; i++) {
      let contFinalizado = 0;
      this.listaTurnos.forEach(turno => {

        if (this.listMedicos[i] == (turno.especialista.apellido + ' ' + turno.especialista.nombre) && turno.estado_turno == 'Pendiente') {
          let hora = (turno.fecha[2]).split("a", 1);
          let horasolo = hora[0].trim();
          horasolo = horasolo.split(':', 2);
          let horaNumber = (parseInt(horasolo[0] + horasolo[1]));

          if (horaNumber >= horaSelectDesde2 && horaNumber <= horaSelectHasta2) {
            contFinalizado++;
            //console.log("a");
            this.cantTurnosPendientesXmedico[i] = contFinalizado;
          }
        } else if (this.listMedicos[i] != (turno.especialista.apellido + ' ' + turno.especialista.nombre) &&
        contFinalizado == 0 && turno.estado_turno == 'Pendiente') {
          this.cantTurnosPendientesXmedico[i] = contFinalizado;
        }
      });
    }

    this.cantTurnosSolicitadosXMedico();
  }


   
  downloadPDF() {
  		
		const DATA = document.getElementById('estadisticasTurnos');
		const doc = new jsPDF('p', 'pt', 'a4', true);
		const options = {
		  background: 'white',
		  scale: 1
		};

		html2canvas(DATA, options).then((canvas) => {

		  const img = canvas.toDataURL('image/PNG');

		  // Add image Canvas to PDF
		  const bufferX = 15;
		  const bufferY = 15;
		  const imgProps = (doc as any).getImageProperties(img);
		  const pdfWidth = doc.internal.pageSize.getWidth();
		  const pdfHeight = doc.internal.pageSize.getHeight();



		  doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
		  return doc;
		}).then((docResult) => {
		  docResult.save(`${new Date().toISOString()}_Graficos_Estadisticas_Turnos.pdf`);
		});
  
  }
}
