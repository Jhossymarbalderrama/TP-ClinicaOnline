import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { MenuComponent } from './componentes/menu/menu.component';


import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegistroComponent } from './componentes/form-registro/form-registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { SendEmailComponent } from './componentes/send-email/send-email.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MenuAdministradorComponent } from './componentes/menu-administrador/menu-administrador.component';
import { HomeAdministradorComponent } from './componentes/home-administrador/home-administrador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { ListadoPacientesComponent } from './componentes/listado-pacientes/listado-pacientes.component';
import { ListadoEspecialistasComponent } from './componentes/listado-especialistas/listado-especialistas.component';
import { ListadoAdministradoresComponent } from './componentes/listado-administradores/listado-administradores.component';
import { InfoUsuariosComponent } from './componentes/info-usuarios/info-usuarios.component';
import { DatosUsuarioComponent } from './componentes/datos-usuario/datos-usuario.component';
import { RegistroUsuariosAdministradorComponent } from './componentes/registro-usuarios-administrador/registro-usuarios-administrador.component';
import { FormRegistroAdministradorComponent } from './componentes/form-registro-administrador/form-registro-administrador.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';


import { FilterEspecialistaEspecialidadPipe } from './pipes/filter-especialista-especialidad.pipe';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { FiltroTurnosXEspecialidadPipe } from './pipes/filtro-turnos-xespecialidad.pipe';
import { FiltroTurnosXNameEspecialistaPipe } from './pipes/filtro-turnos-xname-especialista.pipe';
import { FiltroTurnosXLastnameEspecialistaPipe } from './pipes/filtro-turnos-xlastname-especialista.pipe';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { FiltroTurnosXLastnamePacientePipe } from './pipes/filtro-turnos-xlastname-paciente.pipe';
import { FiltroTurnosXNamePacientePipe } from './pipes/filtro-turnos-xname-paciente.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { DetalleHistoriaClinicaComponent } from './componentes/detalle-historia-clinica/detalle-historia-clinica.component';
import { FiltroTurnosCualquierCampoPipe } from './pipes/filtro-turnos-cualquier-campo.pipe';
import { ChartsAdministradorComponent } from './componentes/charts-administrador/charts-administrador.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidaComponent,
    MenuComponent,
    FormRegistroComponent,
    SendEmailComponent,
    MenuAdministradorComponent,
    HomeAdministradorComponent,
    SeccionUsuariosComponent,
    ListadoPacientesComponent,
    ListadoEspecialistasComponent,
    ListadoAdministradoresComponent,
    InfoUsuariosComponent,
    DatosUsuarioComponent,
    RegistroUsuariosAdministradorComponent,
    FormRegistroAdministradorComponent,
    PaginaErrorComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent,    
    FilterEspecialistaEspecialidadPipe,
    MisHorariosComponent,
    TurnosComponent,
    FiltroTurnosXEspecialidadPipe,
    FiltroTurnosXNameEspecialistaPipe,
    FiltroTurnosXLastnameEspecialistaPipe,
    MisTurnosComponent,
    FiltroTurnosXLastnamePacientePipe,
    FiltroTurnosXNamePacientePipe,
    HistoriaClinicaComponent,
    DetalleHistoriaClinicaComponent,
    FiltroTurnosCualquierCampoPipe,
    ChartsAdministradorComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgbModule,
    BrowserAnimationsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
