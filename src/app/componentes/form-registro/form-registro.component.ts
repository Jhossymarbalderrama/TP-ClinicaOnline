import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/auth.service';

import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

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

  //Output
  @Output() volverEvent = new EventEmitter<boolean>();

  tipoForm: string = '';
  formEspecialista: string = "especialistas";
  formPaciente: string = "pacientes";

  //Formulario General
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

  //Agregado Formulario para Paciente
  obra_social: string = '';
  fotosPaciente: [] = [];
  foto_1_paciente: any = '';
  foto_2_paciente: any = '';

  errorFotoPaciente:boolean = false;

  //Agregado Formulario para Especialista
  especialidad: string = '';
  fotoEspecialista: string = '';
  foto_especialista: string = '';

  passwordInvalid: boolean = false;
  spinner: boolean = false;

  constructor(
    private FormBuilder: FormBuilder,
    private FirestoreService: FirestoreService,
    private Router: Router,
    private AuthService: AuthService
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
        'fotosPaciente': ['', [Validators.required]]
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
        'fotoEspecialista': ['', [Validators.required]]
      });
    }

  }

  altaRegistro() {
    if (this.formularioRegistro.get("password")?.value ==
      this.formularioRegistro.get("repetir_password")?.value
    ) {
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
  
          this.paciente.foto = fotos;//Le adjunto link de sus fotos en firebase

          if(this.paciente.foto[1] != undefined){
            // //console.log(this.paciente);
    
            this.FirestoreService.altaPaciente(this.paciente); //Doy de alta el Paciente en FB
            this.AuthService.user = this.paciente;
            this.AuthService.register(this.paciente.mail, this.paciente.password); //Doy de alta el registro en Autentication FB    
            this.errorFotoPaciente = false;
            this.loadingSession(); 
          }else{          
            this.errorFotoPaciente = true;
          }
      } else if (this.tipoForm == this.formEspecialista) {

        this.especialista = {
          nombre: this.formularioRegistro.get("nombre")?.value,
          apellido: this.formularioRegistro.get("apellido")?.value,
          edad: this.formularioRegistro.get("edad")?.value,
          dni: this.formularioRegistro.get("dni")?.value,
          especialidad: this.formularioRegistro.get("especialidad")?.value,
          mail: this.formularioRegistro.get("mail")?.value,
          password: this.formularioRegistro.get("password")?.value,
          foto: this.formularioRegistro.get("fotoEspecialista")?.value,
          habilitado: false,
          tipoUsuario: "ESP"
        }

        this.especialista.foto = this.foto_especialista; //Le adjunto link de su foto en firebase

        //console.log(this.especialista);

        this.FirestoreService.altaEspecialista(this.especialista); //Doy de alta el Paciente en FB
        this.AuthService.user = this.especialista;
        this.AuthService.register(this.especialista.mail, this.especialista.password);        
        this.loadingSession();  
      }          
    } else {
      this.passwordInvalid = true;
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
      // if(result.value){
      //   this.Router.navigateByUrl('/login');
      // }
    });
  }

  subirFotosPaciente($event: any) {
    this.foto_1_paciente = $event?.target.files[0];
    this.foto_2_paciente = $event?.target.files[1];

    // console.log(this.foto_1_paciente);
    // console.log(this.foto_2_paciente);
  }

  subirFotoEspecialista($event: any) {
    //console.log($event?.target.files[0]);
    this.foto_especialista = $event?.target.files[0];
  }

  volver() {
    this.volverEvent.emit(false);
  }

  loadingSession(){
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.msjVerificacionMail();
    }, 2000);    
  }
}
