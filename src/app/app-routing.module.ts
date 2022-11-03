import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SendEmailComponent } from './componentes/send-email/send-email.component';
import { GuardGuard } from './guards/guard.guard';

// {path:'menu-administrador', component: MenuAdministradorComponent, canActivate: [GuardGuard]},  
const routes: Routes = [
  {path:'', component:BienvenidaComponent},
  {path:'bienvenida', component: BienvenidaComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'verificacion-email', component: SendEmailComponent, canActivate: [GuardGuard]},  
  {path: 'menu-administrador', loadChildren: () => import('./modulos/logueo-usuarios/logueo-usuarios.module').then(m => m.LogueoUsuariosModule)}, 
  {path:'**', component: BienvenidaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
