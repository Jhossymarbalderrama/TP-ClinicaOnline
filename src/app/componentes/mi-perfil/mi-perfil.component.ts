import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from 'src/app/services/firestore.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
	selector: 'app-mi-perfil',
	templateUrl: './mi-perfil.component.html',
	styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {


	tipoUsuario: string = "";

	paciente: any;
	listaTurnosAux: any = [];
	listaTurnos: any = [];
	listTurnosRealizadosXpaciente: any = [];
	listaHistorialesClinicos: any = [];


	auxHistoriasClinicas: any = [];

	viewHistorialClinico: boolean = false;

	especialidades: any = [];

	especialidadSelect: string = "";
	auxListaTurnosPaciente: any = [];
	constructor(
		public AuthService: AuthService,
		private FirestoreService: FirestoreService
	) {

		this.creatBase64();
		this.FirestoreService.listaTurnos().subscribe(turnos => {
			this.listaTurnos = turnos;
			this.cargarTurnos();
		});

		this.FirestoreService.listaHistorialesClinicos().subscribe(historiaClinica => {
			this.listaHistorialesClinicos = historiaClinica;
			this.cargarHistoriasClinicas();
		});


		if (this.AuthService.user.tipoUsuario == 'PAC') {
			this.paciente = this.AuthService.user;
		}

		setTimeout(() => {
			this.buscoTurnosRealizados(this.paciente);
		}, 1500);
	}

	async creatBase64() {
		this.logo64 = await this.toDataURL("../../../assets/imagenes/Logo-Dark.png");
	}

	async toDataURL(url:any) {
		var res = await fetch(url);
		var blob = await res.blob();

		const result = await new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.addEventListener("load", function () {
				resolve(reader.result);
			}, false);

			reader.onerror = () => {
				return reject(this);
			};
			reader.readAsDataURL(blob);
		})

		return result
	};


	logo64: any;
	createPdf() {
		let date = new Date;
		let fecha = date.toLocaleString("es-ES");

		const pdfDefinition: any = {		
			content: [
				{
					stack: [
						{
							image: this.logo64,
							width: 180,
							height: 50,
						},
						{ text: 'Fecha de Emision: ' + fecha, style: 'fechaEmision' },
						'Historial Clinico',
						{ text: 'informacion del paciente: ' + this.AuthService.user?.apellido + " " + this.AuthService.user?.nombre, style: 'subheader' },
					],
					style: 'header'
				},
				{
					text: 'DNI: ' + this.AuthService.user?.dni
				},
				{
					text: 'Apellido: ' + this.AuthService.user?.apellido
				},
				{
					text: 'Nombre: ' + this.AuthService.user?.nombre
				},
				{
					text: 'Edad: ' + this.AuthService.user?.edad
				},
				{
					text: 'Mail: ' + this.AuthService.user?.mail
				},
				{
					text: 'Obra Social: ' + this.AuthService.user?.obra_social
				},
			],
			styles: {
				header: {
					fontSize: 28,
					bold: true,
					color: '#008B81',
					alignment: 'left',
					margin: [0, 20, 0, 10]
				},
				subheader: {
					fontSize: 10,
					color: '#000000',
					alignment: 'left'
				},
				fechaEmision: {
					alignment: 'right',
					color: '#000000',
					fontSize: 11
				},
				tituloConsulta: {
					fontSize: 18,
					bold: true,
					color: '#008B81'
				},
				tituloFecha: {
					fontSize: 16,
					bold: true,
					color: '#000000'
				}
			}
		}

		let datosFiltrados = this.listTurnosRealizadosXpaciente.filter((item, index) => {
			return this.listTurnosRealizadosXpaciente.indexOf(item) === index;
		});

		this.listTurnosRealizadosXpaciente = datosFiltrados;

		if (this.especialidadSelect.length != 0 && this.especialidadSelect != 'Todas') {
			let filtroXespecialidad = this.listTurnosRealizadosXpaciente.filter((item) => item.especialidad === this.especialidadSelect);
			this.listTurnosRealizadosXpaciente = filtroXespecialidad;
		}

		this.listTurnosRealizadosXpaciente.forEach(data => {
			pdfDefinition.content.push(
				{
					text: '\nConsulta: ' + data.especialidad, style: 'tituloConsulta'
				},
				{
					text: 'Fecha del turno:' + data.fecha, style: 'tituloFecha'
				},
				{
					ul: [
						'Altura: ' + data.datosHC.altura,
						'Peso: ' + data.datosHC.peso,
						'Temperatura: ' + data.datosHC.temperatura,
						'Presión: ' + data.datosHC.presion
					],
					text: 'Reseña: ' + data.resenea
				},
				{
					text: 'Observaciones:', style: 'tituloFecha',
				},
				{
					ul: [
						data.datosHC.datos_1[0] + " : " + data.datosHC.datos_1[1],
						data.datosHC.datos_2[0] + " : " + data.datosHC.datos_2[1],
						data.datosHC.datos_3[0] + " : " + data.datosHC.datos_3[1],
					]
				}
			);
		});

		const pdf = pdfMake.createPdf(pdfDefinition);
		//pdf.open();



		pdf.download('Historial_Clinico_'+this.AuthService.user.id+"_"+fecha);
	}

	selectEspecialidad(especialidad: string) {
		this.especialidadSelect = especialidad;
		this.listTurnosRealizadosXpaciente = this.auxListaTurnosPaciente;
	}


	cargarTurnos() {
		this.especialidades = [];
		this.listaTurnos.forEach(element => {

			this.listaTurnosAux.push(element);

			if (element.paciente.id == this.AuthService.user.id &&
				element.estado_turno == 'Realizado') {
				this.especialidades.push(element.especialidad);
			}
		});


		let especialidadesFilter = this.especialidades.filter((item, index) => {
			return this.especialidades.indexOf(item) === index;
		});

		this.especialidades = especialidadesFilter;

	}

	cargarHistoriasClinicas() {
		this.listaHistorialesClinicos.forEach(element => {
			this.auxHistoriasClinicas.push(element);
		});
	}

	buscoTurnosRealizados(paciente: any) {
		this.listTurnosRealizadosXpaciente = [];

		this.listaTurnosAux.forEach((turno:any) => {
			if (turno.paciente?.id == paciente?.id &&
				turno.estado_turno == 'Realizado') {
				this.auxHistoriasClinicas.forEach(hclinica => {
					if (hclinica.id_atencion == turno.id) {
						let datosHC = hclinica;
						turno.datosHC = datosHC;
						this.listTurnosRealizadosXpaciente.push(turno);
					}
				});
			}
		});

		this.auxListaTurnosPaciente = this.listTurnosRealizadosXpaciente;
	}

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


	// createPDF(){    
	// 	setTimeout(() => {
	// 	  this.downloadPDF();
	// 	}, 1000);
	//   }

	//   public downloadPDF() {
	// 	// Extraemos el
	// 	const DATA = document.getElementById('htmlData');
	// 	const doc = new jsPDF('p', 'pt', 'a4');
	// 	const options = {
	// 	  background: 'white',
	// 	  scale: 3
	// 	};
	// 	html2canvas(DATA, options).then((canvas) => {

	// 	  const img = canvas.toDataURL('image/PNG');

	// 	  // Add image Canvas to PDF
	// 	  const bufferX = 15;
	// 	  const bufferY = 15;
	// 	  const imgProps = (doc as any).getImageProperties(img);
	// 	  const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
	// 	  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
	// 	  doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
	// 	  return doc;
	// 	}).then((docResult) => {
	// 	  docResult.save(`${new Date().toISOString()}_Historia_Clinica.pdf`);
	// 	});
	//   }
}
