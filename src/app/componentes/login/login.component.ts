import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // fotoAdmin_1: string = "../../../assets/imagenes/iconos/administrador.png";
  // fotoEsp_1: string = "../../../assets/imagenes/iconos/especialista-1.png";
  // fotoEsp_2: string = "../../../assets/imagenes/iconos/especialista-2.png";
  // fotoPac_1: string = "../../../assets/imagenes/iconos/paciente-1.png";
  // fotoPac_2: string = "../../../assets/imagenes/iconos/paciente-2.png";
  // fotoPac_3: string = "../../../assets/imagenes/iconos/paciente-1.png";

  fotoAdmin_1: string = "";
  fotoEsp_1: string = "";
  fotoEsp_2: string = "";
  fotoPac_1: string = "";
  fotoPac_2: string = "";
  fotoPac_3: string = "";

  formLogin!: FormGroup;

  usuario: Usuario = {
    mail: "",
    password: ""
  }

  listaAdministradores: any = [];
  listaEspecialistas: any = [];
  listaPacientes: any = [];

  listaUsuarios: any = [];

  userExist: boolean = false;
  noHabilitado: boolean = false;
  spinner: boolean = false;
  noEncontroUser: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private FirestoreService: FirestoreService,
    private Router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });


    //Administrador
    this.FirestoreService.listaAdministradores().subscribe(value => {
      this.listaAdministradores = value;
      this.cargarArray(this.listaAdministradores);
    });

    //Especialistas
    this.FirestoreService.listaEspecialistas().subscribe(value => {
      this.listaEspecialistas = value;
      this.cargarArray(this.listaEspecialistas);
    });

    //Pacientes
    this.FirestoreService.listaPacientes().subscribe(value => {
      this.listaPacientes = value;
      this.cargarArray(this.listaPacientes);
    });


    setTimeout(() => {

      //console.log("Lista General usuarios");
      //console.log(this.listaUsuarios);
    }, 500);
  }



  cargarArray(lista: any) {
    for (const item of lista) {
      this.listaUsuarios.push(item);

      this.cargarFotosAccesosR(item);
    }
  }

  cargarFotosAccesosR(item: any) {
    if (item.mail == "pedro@gmail.com" && item.password == "Pedro159") {
      this.fotoAdmin_1 = item.foto;
    }

    if (item.mail == "julian@gmail.com" && item.password == "julian123") {
      this.fotoPac_1 = item.foto[0];
    } else if (item.mail == "rodriguez@gmail.com" && item.password == "Rodriguez159") {
      this.fotoPac_2 = item.foto[0];
    } else if (item.mail == "gabriel@gmail.com" && item.password == "gabriel123") {
      this.fotoPac_3 = item.foto[0];
    }

    if (item.mail == "manuel@gmail.com" && item.password == "Manuel159") {
      this.fotoEsp_1 = item.foto;
    } else if (item.mail == "maria@gmail.com" && item.password == "maria123") {
      this.fotoEsp_2 = item.foto;
    }
  }

  async onLogin() {
    this.userExist = false;
    this.noEncontroUser = true;
    //console.log("Estoy en Login");
    if (this.formLogin.valid) {
      this.usuario = {
        mail: this.formLogin.get('mail')?.value,
        password: this.formLogin.get('password')?.value
      };

      //this.AuthService.user = this.usuario;

      for (const item of this.listaUsuarios) {

        if (item.mail == this.usuario.mail &&
          item.password == this.usuario.password) {

          this.AuthService.user = item; //Logueo Local

          this.AuthService.login(this.usuario.mail, this.usuario.password); //Logueo con Autentication FireBase

          setTimeout(() => {
            //console.log(this.AuthService.userDateFirebase.user);

            if (this.usuariosLocales()) {
              if (this.AuthService.user.tipoUsuario == "ESP") {
                if (this.AuthService.user.habilitado) {
                  console.log("1");
                  this.loadingSession();
                } else {
                  //Usuario No habilitado por un Administrador                    
                  this.spinner = true;
                  setTimeout(() => {
                    this.spinner = false;
                    this.noHabilitado = true;
                  }, 1000);
                }
              } else {
                console.log("2");
                this.loadingSession();
              }

            } else {
              if (this.AuthService.userDateFirebase.user.emailVerified == true) {
                if (this.AuthService.user.tipoUsuario == "ESP") {
                  if (this.AuthService.user.habilitado) {
                    console.log("3");
                    this.loadingSession();
                  } else {
                    //Usuario No habilitado por un Administrador                      
                    this.spinner = true;
                    setTimeout(() => {
                      this.spinner = false;
                      this.noHabilitado = true;
                    }, 1000);
                  }
                } else {
                  console.log("4");
                  this.loadingSession();
                }
              } else if (this.AuthService.userDateFirebase.user.emailVerified == false) {
                //console.log("Redirecciono a verificar Email");
                this.spinner = true;
                setTimeout(() => {
                  this.spinner = false;
                  this.Router.navigateByUrl('/verificacion-email');
                }, 1000);
              }
            }
          }, 1000);
          this.noEncontroUser = false;
        }

        if (this.noEncontroUser == false) {
          break;
        } else {
          this.userExist = true;
        }
      }
      
    }
  }

  loadingSession() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;

      this.Router.navigateByUrl('/menu-administrador');
    }, 2000);
  }

  usuariosLocales(): boolean {
    let rta: boolean = false;

    if (this.AuthService.user.mail == "maria@gmail.com" &&
      this.AuthService.user.password == "maria123"
    ) {
      rta = true;
    } else if (this.AuthService.user.mail == "manuel@gmail.com" &&
      this.AuthService.user.password == "Manuel159"
    ) {
      rta = true;
    } else if (this.AuthService.user.mail == "gabriel@gmail.com" &&
      this.AuthService.user.password == "gabriel123"
    ) {
      rta = true;
    } else if (this.AuthService.user.mail == "rodriguez@gmail.com" &&
      this.AuthService.user.password == "Rodriguez159"
    ) {
      rta = true;
    } else if (this.AuthService.user.mail == "julian@gmail.com" &&
      this.AuthService.user.password == "julian123"
    ) {
      rta = true;
    } else if (this.AuthService.user.mail == "pedro@gmail.com" &&
      this.AuthService.user.password == "Pedro159"
    ) {
      rta = true;
    }

    return rta;
  }

  loginRapido(login: number) {
    switch (login) {
      case 1:
        this.formLogin.get('mail')?.setValue("pedro@gmail.com");
        this.formLogin.get('password')?.setValue("Pedro159");
        break;
      case 2:
        this.formLogin.get('mail')?.setValue("manuel@gmail.com");
        this.formLogin.get('password')?.setValue("Manuel159");
        break;
      case 3:
        this.formLogin.get('mail')?.setValue("maria@gmail.com");
        this.formLogin.get('password')?.setValue("maria123");
        break;
      case 4:
        this.formLogin.get('mail')?.setValue("julian@gmail.com");
        this.formLogin.get('password')?.setValue("julian123");
        break;
      case 5:
        this.formLogin.get('mail')?.setValue("rodriguez@gmail.com");
        this.formLogin.get('password')?.setValue("Rodriguez159");
        break;
      case 6:
        this.formLogin.get('mail')?.setValue("gabriel@gmail.com");
        this.formLogin.get('password')?.setValue("gabriel123");
        break;

    }
  }

}
