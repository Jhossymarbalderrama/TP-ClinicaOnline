import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from 'src/app/servicios/firestore.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
	selector: 'app-mi-perfil',
	templateUrl: './mi-perfil.component.html',
	styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {


	tipoUsuario: string = "";

	paciente: any;
	// listaTurnosAux: any = [];
	// listaTurnos: any = [];
	// listTurnosRealizadosXpaciente: any = [];
	// listaHistorialesClinicos: any = [];


	// auxHistoriasClinicas: any = [];

	// viewHistorialClinico: boolean = false;

	constructor(
		public AuthService: AuthService,
		private FirestoreService: FirestoreService
	) {

		// this.FirestoreService.listaTurnos().subscribe(turnos => {
		// 	this.listaTurnos = turnos;
		// 	this.cargarTurnos();
		// });

		// this.FirestoreService.listaHistorialesClinicos().subscribe(historiaClinica => {
		// 	this.listaHistorialesClinicos = historiaClinica;
		// 	this.cargarHistoriasClinicas();
		// });

		// if (this.AuthService.user.tipoUsuario == 'PAC') {
		// 	this.paciente = this.AuthService.user;
		// }

		// setTimeout(() => {
		// 	this.buscoTurnosRealizados(this.paciente);
		// }, 1500);
	}

	// cargarTurnos() {
	// 	this.listaTurnos.forEach(element => {
	// 		this.listaTurnosAux.push(element);
	// 	});

	// }

	// cargarHistoriasClinicas() {
	// 	this.listaHistorialesClinicos.forEach(element => {
	// 		this.auxHistoriasClinicas.push(element);
	// 	});


	// }

	// buscoTurnosRealizados(paciente: any) {
	// 	this.listTurnosRealizadosXpaciente = [];
	
	// 	this.listaTurnosAux.forEach(turno => {
	// 	  if (turno.paciente.id == paciente.id &&
	// 		turno.estado_turno == 'Realizado') {
	// 		this.auxHistoriasClinicas.forEach(hclinica => {
	// 		  if (hclinica.id_atencion == turno.id) {
	// 			let datosHC = hclinica;
	// 			turno.datosHC = datosHC;
	// 			this.listTurnosRealizadosXpaciente.push(turno);
	// 		  }
	// 		});
	// 	  }
	// 	});
	//   }

	ngOnInit(): void {
		switch (this.AuthService.user.tipoUsuario) {
			case "PAC":
				this.tipoUsuario = "Paciente"
				break;
			case "ESP":
				this.tipoUsuario = "Especialista"
				break;

			case "ADM":
				this.tipoUsuario = "Administrador"
				break;

		}
	}



	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true })
	carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}


	createPDF(){    
		setTimeout(() => {
		  this.downloadPDF();
		}, 1000);
	  }
	
	  public downloadPDF() {
		// Extraemos el
		const DATA = document.getElementById('htmlData');
		const doc = new jsPDF('p', 'pt', 'a4');
		const options = {
		  background: 'white',
		  scale: 3
		};
		html2canvas(DATA, options).then((canvas) => {
	
		  const img = canvas.toDataURL('image/PNG');
	
		  // Add image Canvas to PDF
		  const bufferX = 15;
		  const bufferY = 15;
		  const imgProps = (doc as any).getImageProperties(img);
		  const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
		  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		  doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
		  return doc;
		}).then((docResult) => {
		  docResult.save(`${new Date().toISOString()}_Historia_Clinica.pdf`);
		});
	  }
}
