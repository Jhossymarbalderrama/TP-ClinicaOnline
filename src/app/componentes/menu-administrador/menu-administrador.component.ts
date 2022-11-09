import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.css']
})
export class MenuAdministradorComponent implements OnInit {

  usuario: any = "";
  seccionUsuariosActivate: boolean = false;
  misTurnosActivate: boolean = false;
  turnosActivate: boolean = false;
  solicitarTurnoActivate: boolean = false;
  miPerfilActivate:boolean = false;
  misHorariosActivate:boolean = false;
  miHomeActivate: boolean = false;
  historiaClinica: boolean = false;
  historiaClinicaEspActivate: boolean = false;

  pagError404:boolean = false;

  constructor(
    public AuthService: AuthService,
    private Router: Router
  ) { 
    this.usuario = this.AuthService.user.tipoUsuario;
  }

  ngOnInit(): void {
    if(this.usuario == 'ADM'){
      this.seccionUsuariosActivate = true;
    }else if(this.usuario == 'ESP' || this.usuario == 'PAC'){
      this.resetValues();
      this.miPerfilActivate = true;
    }
  }


  onSeccionUsuarios(){
    this.resetValues();
    this.seccionUsuariosActivate = true;
  }

  onMisTurnos(){
    this.resetValues();
    this.misTurnosActivate = true;
  }

  onTurnos(){
    this.resetValues();
    this.turnosActivate = true;
  }

  onSolicitarTurno(){
    this.resetValues();
    this.solicitarTurnoActivate = true;
  }

  onPerfil(){
    //Seccion Perfil
    this.resetValues();
    this.miPerfilActivate = true;
  }

  onHistoriaClinica(){
    this.resetValues();
    this.historiaClinica = true;
  }

  onMisHorarios(){
    this.resetValues();
    this.misHorariosActivate = true;
  }

  onLogout(){
    this.AuthService.user = "";
    this.AuthService.logout();
    this.Router.navigateByUrl('/bienvenida');
  }
  
  onMiHome(){
    this.resetValues();
    this.miHomeActivate = true;    
  }

  onSeccionPacientes(){
    this.resetValues();
    this.historiaClinicaEspActivate = true;
  }
  
  resetValues(){
    this.seccionUsuariosActivate = false;
    this.misTurnosActivate = false;
    this.turnosActivate = false;
    this.solicitarTurnoActivate = false;
    this.miPerfilActivate = false;
    this.misHorariosActivate = false;
    this.miHomeActivate = false;
    this.historiaClinica = false;
    this.historiaClinicaEspActivate = false;
    this.pagError404 = false;
  }
}
