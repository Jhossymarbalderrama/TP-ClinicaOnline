import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-detalle-historia-clinica',
    templateUrl: './detalle-historia-clinica.component.html',
    styleUrls: ['./detalle-historia-clinica.component.css']
})
export class DetalleHistoriaClinicaComponent implements OnInit {
    @ViewChild('htmlData') htmlData!: ElementRef;
    @Input() set selectPaciente(paciente: any) {
        this.paciente = paciente;

        this.buscoTurnosRealizados(this.paciente);
    }

    paciente: any;
    listaTurnosAux: any = [];
    listaTurnos: any = [];
    listTurnosRealizadosXpaciente: any = [];
    listaHistorialesClinicos: any = [];
    auxHistoriasClinicas: any = [];

    spinner: boolean = true;

    constructor(
        private AuthService: AuthService,
        private FirestoreService: FirestoreService
    ) {

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

    ngOnInit(): void {

    }

    cargarTurnos() {
        this.listaTurnos.forEach(element => {
            this.listaTurnosAux.push(element);
        });

    }

    cargarHistoriasClinicas() {
        this.listaHistorialesClinicos.forEach(element => {
            this.auxHistoriasClinicas.push(element);
        });
    }

    buscoTurnosRealizados(paciente: any) {
        this.listTurnosRealizadosXpaciente = [];

        this.listaTurnosAux.forEach(turno => {
            if (turno.paciente.id == paciente.id &&
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

        setTimeout(() => {
            this.spinner = false;
        }, 1500);
    }


    createPDF() {
        setTimeout(() => {
            this.downloadPDF();
        }, 1000);
    }


    public downloadPDF() {
        const DATA = document.getElementById('htmlData');
        const doc = new jsPDF('p', 'pt', 'a4');
        const options = {
            background: 'white',
            scale: 3
        };

        html2canvas(DATA, options).then((canvas) => {
            const imgWidth = 595.28 - 40;
            const pageHeight = 841.89;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            const pdfWidth = imgWidth;
            const pdfHeight = pageHeight - 85;
            let position = 50;

            const img = canvas.toDataURL('image/PNG');

            const addHeader = (doc: any) => {
                doc.setFontSize(12);
                doc.setTextColor('#008b82d2');
                doc.text('Clinica Online', 20, 20);
                doc.setTextColor(0, 0, 0);
                doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 450, 20);
            };

            const addFooter = (doc: any, pageNumber: number) => {
                doc.setFontSize(10);
                doc.text(`Página ${pageNumber}`, doc.internal.pageSize.getWidth() / 2, pageHeight - 20, {
                    align: 'center'
                });
            };

            let pageNumber = 1;

            addHeader(doc);
            doc.addImage(img, 'PNG', 20, position, pdfWidth, imgHeight);
            addFooter(doc, pageNumber);
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                pageNumber++;
                addHeader(doc);
                doc.addImage(img, 'PNG', 20, position, pdfWidth, imgHeight);
                addFooter(doc, pageNumber);
                heightLeft -= pdfHeight;
            }

            let datoPaciente = `${this.paciente.dni}_${this.paciente.nombre}_${this.paciente.nombre}`;
            doc.save(datoPaciente + `_${new Date().toISOString()}_Historia_Clinica.pdf`);
        });
    }


}
