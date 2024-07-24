import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/classes/especialista';
import { Paciente } from 'src/app/classes/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { CaptchaService } from 'src/app/services/captcha.service';

import { FirestoreService } from 'src/app/services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

  //Input
  @Input() set formulario(value: any) {
    if (value == "PAC" || value == "ESP" || value == "ADM") {
      if (value == "PAC") {
        this.tipoForm = "pacientes";
      } else if (value == "ESP") {
        this.tipoForm = "especialistas";
      } else if (value == "ADM") {
        this.tipoForm = "administrador";
      }

      this.fromAdministracion = true;
    } else {
      this.fromAdministracion = false;
      this.tipoForm = value;
    }
  }

  fromAdministracion: boolean = false;

  // ? Output
  @Output() volverEvent = new EventEmitter<boolean>();

  tipoForm: string = '';
  formEspecialista: string = "especialistas";
  formPaciente: string = "pacientes";

  // ? Formulario General
  formularioRegistro !: FormGroup;
  especialista: Especialista = new Especialista("", "", 99, 99999999, "", "", "", "");
  paciente: Paciente = new Paciente("", "", 99, 99999999, "", "", "", []);

  nombre: string = '';
  apellido: string = '';
  edad: number = 99;
  dni: number = 99999999;
  mail: string = '';
  password: string = '';
  repetir_password: string = '';

  // ? Agregado Formulario para Paciente
  obra_social: string = '';
  fotosPaciente: [] = [];
  foto_1_paciente: any = '';
  foto_2_paciente: any = '';

  errorFotoPaciente: boolean = false;

  // ? Agregado Formulario para Especialista
  especialidad: string = '';
  fotoEspecialista: string = '';
  foto_especialista: string = '';

  spinner: boolean = false;

  arrayEspecialidades: any = [];
  htmlEspecialidad: any = [];
  especialidadtest: any = [];

  captcha: string = "";

  constructor(
    private FormBuilder: FormBuilder,
    private FirestoreService: FirestoreService,
    private Router: Router,
    private AuthService: AuthService,
    private Captcha: CaptchaService
  ) { }

  ngOnInit(): void {
    if (this.tipoForm == this.formPaciente) {
      this.formularioRegistro = this.FormBuilder.group({
        'nombre': ['', [Validators.required, Validators.min(3)]],
        'apellido': ['', [Validators.required, Validators.min(3)]],
        'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
        'dni': ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
        'obra_social': ['', [Validators.required, Validators.min(3)]],
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'repetir_password': ['', [Validators.required, Validators.minLength(6)]],
        'fotosPaciente': ['', [Validators.required]],
        'captcha': ['', [Validators.required]]
      });
    } else if (this.tipoForm == this.formEspecialista) {
      this.formularioRegistro = this.FormBuilder.group({
        'nombre': ['', [Validators.required, Validators.min(3)]],
        'apellido': ['', [Validators.required, Validators.min(3)]],
        'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
        'dni': ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
        'especialidad': ['', [Validators.required, Validators.minLength(3)]],
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'repetir_password': ['', [Validators.required, Validators.minLength(6)]],
        'fotoEspecialista': ['', [Validators.required]],
        'captcha': ['', [Validators.required]]
      });
    }

    this.captcha = this.Captcha.generarPalabra();
  }

  altaRegistro() {
    let captchaSuccess: boolean = false;

    if (this.captcha == this.formularioRegistro.get('captcha')?.value) {
      captchaSuccess = true;
    } else {
      captchaSuccess = false;
    }

    if (captchaSuccess) {
      if (this.tipoForm == this.formPaciente) {
        this.paciente = {
          nombre: this.formularioRegistro.get("nombre")?.value,
          apellido: this.formularioRegistro.get("apellido")?.value,
          edad: this.formularioRegistro.get("edad")?.value,
          dni: this.formularioRegistro.get("dni")?.value,
          obra_social: this.formularioRegistro.get("obra_social")?.value,
          mail: this.formularioRegistro.get("mail")?.value,
          password: this.formularioRegistro.get("password")?.value,
          foto: this.formularioRegistro.get("fotosPaciente")?.value,
          tipoUsuario: "PAC"
        }

        let fotos: Array<string> = [];

        fotos.push(this.foto_1_paciente);
        fotos.push(this.foto_2_paciente);

        this.paciente.foto = fotos; // ? Le adjunto link de sus fotos en firebase

        if (this.paciente.foto[1] != undefined) {

          this.FirestoreService.altaPaciente(this.paciente); // ? Doy de alta el Paciente en FB
          this.AuthService.user = this.paciente;
          this.AuthService.register(this.paciente.mail, this.paciente.password); // ? Doy de alta el registro en Autentication FB    
          this.errorFotoPaciente = false;
          this.loadingSession();
        } else {
          this.errorFotoPaciente = true;
        }
      } else if (this.tipoForm == this.formEspecialista) {

        let especialidad: any = [];

        if (this.especialidadtest.length > 0) {
          this.especialidadtest.push(this.formularioRegistro.get("especialidad")?.value);
          especialidad = this.especialidadtest;
        } else {
          this.especialidadtest.push(this.formularioRegistro.get("especialidad")?.value);
          especialidad = this.especialidadtest;
        }

        this.especialista = {
          nombre: this.formularioRegistro.get("nombre")?.value,
          apellido: this.formularioRegistro.get("apellido")?.value,
          edad: this.formularioRegistro.get("edad")?.value,
          dni: this.formularioRegistro.get("dni")?.value,
          especialidad: especialidad,
          mail: this.formularioRegistro.get("mail")?.value,
          password: this.formularioRegistro.get("password")?.value,
          foto: this.formularioRegistro.get("fotoEspecialista")?.value,
          habilitado: false,
          tipoUsuario: "ESP"
        }

        this.especialista.foto = this.foto_especialista; // ? Le adjunto link de su foto en firebase

        this.FirestoreService.altaEspecialista(this.especialista); // ? Doy de alta el Paciente en FB
        this.AuthService.user = this.especialista;
        this.AuthService.register(this.especialista.mail, this.especialista.password);
        this.htmlEspecialidad = [];
        this.especialidadtest = [];
        this.loadingSession();
      }
    }
  }

  msjVerificacionMail() {
    Swal.fire({
      icon: 'success',
      title: 'Gracias por registrarse',
      text: `Se le envio un mail de verificacion a ${this.AuthService.user.mail}`,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      this.formularioRegistro.reset();
    });
  }

  subirFotosPaciente($event: any) {
    this.foto_1_paciente = $event?.target.files[0];
    this.foto_2_paciente = $event?.target.files[1];
  }


  subirFotoEspecialista($event: any) {
    this.foto_especialista = $event?.target.files[0];
  }

  volver() {
    this.volverEvent.emit(false);
  }

  loadingSession() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.generarCaptcha();
      this.msjVerificacionMail();
    }, 2000);
  }

  generarCaptcha() {
    this.captcha = this.Captcha.generarPalabra();
  }


  generarAddEspecialidad() {
    this.htmlEspecialidad.push("");
    this.especialidadtest.push("");;
  }

  borrarCampo(indice: any) {
    if (indice == 0 && this.htmlEspecialidad.length == 1) {
      this.htmlEspecialidad = [];
      this.especialidadtest = [];
    } else if (indice == 0) {
      this.htmlEspecialidad.splice(0, 1);
      this.especialidadtest.splice(0, 1);
    }
    else {
      this.htmlEspecialidad.splice(indice, indice);
      this.especialidadtest.splice(indice, indice);
    }
  }
}
