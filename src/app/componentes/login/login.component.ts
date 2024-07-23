import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersAccessLocal: any[] = [
    { email: "pedro@gmail.com", password: "Pedro159" },
    { email: "manuel@gmail.com", password: "Manuel159" },
    { email: "maria@gmail.com", password: "maria123" },
    { email: "julian@gmail.com", password: "julian123" },
    { email: "rodriguez@gmail.com", password: "Rodriguez159" },
    { email: "gabriel@gmail.com", password: "gabriel123" }
  ];

  formLogin!: FormGroup;

  usuario: Usuario = {
    mail: "",
    password: ""
  }

  listaAdministradores: any = [];
  listaEspecialistas: any = [];
  listaPacientes: any = [];

  listaUsuarios: any = []; // ? Lista de Todos los Usuarios que se encuentran en Firebase

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


    // ? Cargo los Administrador a la lista de listaUsuarios
    this.FirestoreService.listaAdministradores().subscribe(value => {
      this.listaAdministradores = value;
      this.cargarArray(this.listaAdministradores);
    });

    // ? Cargo los Especialistas a la lista de listaUsuarios
    this.FirestoreService.listaEspecialistas().subscribe(value => {
      this.listaEspecialistas = value;
      this.cargarArray(this.listaEspecialistas);
    });

    // ? Cargo los Pacientes a la lista de listaUsuarios
    this.FirestoreService.listaPacientes().subscribe(value => {
      this.listaPacientes = value;
      this.cargarArray(this.listaPacientes);
    });
  }


  /**
   * Cargo la lista local de usuario
   * @param lista usuarios de un tipo que cargo a la lista local de user
   */
  cargarArray(lista: any) {
    for (const item of lista) {
      this.listaUsuarios.push(item);
      this.cargarFotosAccesosR(item);
    }
  }

  /**
   * Cargo info a los datos de users local
   * @param item user que viene de Firebase al suscribirme
   */
  cargarFotosAccesosR(item: any) {
    this.usersAccessLocal.some(usr => {
      if (item.mail == usr.email && item.password == usr.password) {
        usr.img = typeof (item.foto) == 'string' ? item.foto : item.foto[0];
        usr.type = item.tipoUsuario;
      }
    });
  }

  /**
   * Metodo de login de usuarios
   */
  async onLogin() {
    this.userExist = false;
    this.noEncontroUser = true;
    if (this.formLogin.valid) {
      this.usuario = {
        mail: this.formLogin.get('mail')?.value,
        password: this.formLogin.get('password')?.value
      };

      for (const item of this.listaUsuarios) {

        if (item.mail == this.usuario.mail &&
          item.password == this.usuario.password) {

          this.AuthService.user = item; //Logueo Local
          this.AuthService.login(this.usuario.mail, this.usuario.password); //Logueo con Autentication FireBase

          setTimeout(() => {
            if (this.usuariosLocales()) {
              if (this.AuthService.user.tipoUsuario == "ESP") {
                if (this.AuthService.user.habilitado) {
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
                this.loadingSession();
              }

            } else {
              if (this.AuthService.userDateFirebase.user.emailVerified == true) {
                if (this.AuthService.user.tipoUsuario == "ESP") {
                  if (this.AuthService.user.habilitado) {
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
                  this.loadingSession();
                }
              } else if (this.AuthService.userDateFirebase.user.emailVerified == false) {
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

  /**
   * Navegación despues de Logueo
   */
  loadingSession() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.Router.navigateByUrl('/menu-administrador');
    }, 2000);
  }


  /**
   * Verifico si el usuario que esta en el Auth existe en la lista local de User
   * @returns boolean True | False
   */
  usuariosLocales(): boolean {
    let rta: boolean = false;

    this.usersAccessLocal.map(usr => {
      if (this.AuthService.user.mail == usr.email &&
        this.AuthService.user.password == usr.password) {
        rta = true;
      }
    });

    return rta;
  }


  /**
   * Setteo los campos de email y password del Formulario para Logearse
   * @param email email de user
   * @param password password de user
   */
  loginRapido(email: string, password: string) {
    this.formLogin.get('mail')?.setValue(email);
    this.formLogin.get('password')?.setValue(password);
  }

}
