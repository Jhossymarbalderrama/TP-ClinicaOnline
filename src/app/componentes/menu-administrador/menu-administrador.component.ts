import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.css']
})
export class MenuAdministradorComponent implements OnInit {


  constructor(
    public AuthService: AuthService,
    private Router: Router
  ) { 
  
  }

  ngOnInit(): void {
  }

  onPerfil(){
    //Seccion Perfil
  }

  onLogout(){
    this.AuthService.user = "";
    this.AuthService.logout();
    this.Router.navigateByUrl('/bienvenida');
  }
}
