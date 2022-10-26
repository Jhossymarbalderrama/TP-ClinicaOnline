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
    FormRegistroAdministradorComponent
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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
