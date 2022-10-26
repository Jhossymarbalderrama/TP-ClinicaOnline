import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosUsuarioComponent } from 'src/app/componentes/datos-usuario/datos-usuario.component';
import { HomeAdministradorComponent } from 'src/app/componentes/home-administrador/home-administrador.component';
import { InfoUsuariosComponent } from 'src/app/componentes/info-usuarios/info-usuarios.component';
import { ListadoAdministradoresComponent } from 'src/app/componentes/listado-administradores/listado-administradores.component';
import { ListadoEspecialistasComponent } from 'src/app/componentes/listado-especialistas/listado-especialistas.component';
import { ListadoPacientesComponent } from 'src/app/componentes/listado-pacientes/listado-pacientes.component';
import { MenuAdministradorComponent } from 'src/app/componentes/menu-administrador/menu-administrador.component';
import { RegistroUsuariosAdministradorComponent } from 'src/app/componentes/registro-usuarios-administrador/registro-usuarios-administrador.component';

import { GuardGuard } from 'src/app/guards/guard.guard';

const routes: Routes = [
  {path: '', component: MenuAdministradorComponent},  
  {path: 'home-administrador', component: HomeAdministradorComponent},
  {path: 'lista-pacientes', component: ListadoPacientesComponent},//infoUsuarios
  {path: 'lista-especialistas', component: ListadoEspecialistasComponent},//infoUsuarios
  {path: 'lista-administradores', component: ListadoAdministradoresComponent},//infoUsuarios
  {path: 'datos-usuario', component: DatosUsuarioComponent},//infoUsuarios
  {path: 'info-usuario', component: InfoUsuariosComponent},//Modulo?
  {path: 'registro-usuarios-administrador', component: RegistroUsuariosAdministradorComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogueoUsuariosRoutingModule { }
