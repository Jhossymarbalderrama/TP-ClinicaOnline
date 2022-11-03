import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/clases/administrador';
import { AuthService } from 'src/app/servicios/auth.service';
import { CaptchaService } from 'src/app/servicios/captcha.service';

import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-registro-administrador',
  templateUrl: './form-registro-administrador.component.html',
  styleUrls: ['./form-registro-administrador.component.css']
})
export class FormRegistroAdministradorComponent implements OnInit {

  //Formulario General
  formularioRegistro !: FormGroup;

  administrador: Administrador = new Administrador("","",99,99999999,"","","");

  nombre:string = '';
  apellido:string = '';
  edad:number = 99;
  dni:number = 99999999;  
  mail:string = '';
  password:string = '';
  repetir_password: string = '';

  foto: string = "";
  fotoAdministradorFB: string = "";

  spinner: boolean = false;
  captcha: string = "";

  constructor(
    private FormBuilder: FormBuilder,
    private FirestoreService:FirestoreService,
    private Router: Router,
    private AuthService: AuthService,
    private Captcha: CaptchaService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.FormBuilder.group({
      'nombre' : ['',[Validators.required,Validators.min(3)]],
      'apellido' : ['',[Validators.required,Validators.min(3)]],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni' : ['',[Validators.required, Validators.min(10000000),Validators.max(99999999)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],
      'repetir_password' : ['',[Validators.required,Validators.minLength(6)]],
      'foto': ['', [Validators.required]],
      'captcha': ['', [Validators.required]]
    });

    this.captcha = this.Captcha.generarPalabra();
  }

  altaRegistro(){
    let captchaSuccess: boolean = false;

    if (this.captcha == this.formularioRegistro.get('captcha')?.value) {
      captchaSuccess = true;
    } else {
      captchaSuccess = false;
    }

    if (captchaSuccess) {
      this.administrador = {
        nombre: this.formularioRegistro.get("nombre")?.value,
        apellido: this.formularioRegistro.get("apellido")?.value,
        edad: this.formularioRegistro.get("edad")?.value,
        dni: this.formularioRegistro.get("dni")?.value,
        mail: this.formularioRegistro.get("mail")?.value,
        password: this.formularioRegistro.get("password")?.value,
        foto: this.formularioRegistro.get("foto")?.value,  
        tipoUsuario: "ADM"
      }
  
      this.administrador.foto = this.fotoAdministradorFB;
  
      //console.log(this.administrador);
  
      this.FirestoreService.altaAdministradores(this.administrador);
      this.AuthService.user = this.administrador;
      this.AuthService.register(this.administrador.mail,this.administrador.password);
  
  
      this.loadingSession();    
    }
    
  }

  msjAltaSuccess(){
    Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado con exito',
          text: `Se le envio un mail de verificacion a ${this.AuthService.user.mail}`,
          confirmButtonText: 'Aceptar'          
        }).then((result) =>{
          this.formularioRegistro.reset();
          // if(result.value){
          //   this.Router.navigateByUrl('/login');
          // }
    });
  }

  subirFoto($event:any){
    //console.log($event?.target.files[0]);
    this.fotoAdministradorFB = $event?.target.files[0]; 
  }

  loadingSession(){
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.generarCaptcha();
      this.msjAltaSuccess(); 
    }, 2000);    
  }

  generarCaptcha() {
    this.captcha = this.Captcha.generarPalabra();
  }
}
