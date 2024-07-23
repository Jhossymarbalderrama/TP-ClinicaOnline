import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc,collectionData,doc,deleteDoc} from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Administrador } from '../classes/administrador';
import { Especialista } from '../classes/especialista';
import { Paciente } from '../classes/paciente';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  storage: any;

  listAdministradoresCollectionReference: any;
  listEspecialistasCollectionReference: any;
  listPacientesCollectionReference: any;
  listTurnosCollectionReference: any;
  listHistoriasCLinicasCollectionReference: any;

  listLogUsuariosCollectionReference: any;

  constructor(
    public FireStore: Firestore
  ) { 
    this.storage = getStorage();

    this.listAdministradoresCollectionReference = collection(this.FireStore,'administradores');
    this.listEspecialistasCollectionReference = collection(this.FireStore,'especialistas');
    this.listPacientesCollectionReference = collection(this.FireStore,'pacientes');
    this.listTurnosCollectionReference = collection(this.FireStore,'turnos');  
    this.listHistoriasCLinicasCollectionReference = collection(this.FireStore,'historialesClinicos');    

    this.listLogUsuariosCollectionReference = collection(this.FireStore, 'logInicioSesion');
  }


  //Altas
  altaAdministradores(administrador: any){
    let referencia = ref(this.storage, administrador.foto.name);
    uploadBytes(referencia, administrador.foto).then((snapshot) =>{
      getDownloadURL(ref(this.storage, administrador.foto.name)).then((url)=>{
        administrador.foto = url;
        return addDoc(this.listAdministradoresCollectionReference, administrador);
      });
    });    
  }

  altaEspecialista(especialista: any){

    let referencia = ref(this.storage, especialista.foto.name);
    uploadBytes(referencia, especialista.foto).then((snapshot) =>{
      getDownloadURL(ref(this.storage, especialista.foto.name)).then((url)=>{
        especialista.foto = url;
        return addDoc(this.listEspecialistasCollectionReference, especialista);
      });
    });

  }

  altaPaciente(paciente: any){

    let referencia_foto_1 = ref(this.storage, paciente.foto[0].name);
    let referencia_foto_2 = ref(this.storage, paciente.foto[1].name);

    uploadBytes(referencia_foto_1, paciente.foto[0]).then((snapshot) =>{
      getDownloadURL(ref(this.storage, paciente.foto[0].name)).then((url)=>{
        paciente.foto[0] = url;

        uploadBytes(referencia_foto_2, paciente.foto[1]).then((snapshot) =>{
          getDownloadURL(ref(this.storage, paciente.foto[1].name)).then((url)=>{
            paciente.foto[1] = url;  
            return addDoc(this.listPacientesCollectionReference, paciente);            
          });
        });                        
      });
    });
  }


  altaTurno(turno: any){
    return addDoc(this.listTurnosCollectionReference,turno);
  }

  altaHistorialCLinico(historial: any){
    return addDoc(this.listHistoriasCLinicasCollectionReference,historial);
  }

  altaLogUsuarios(usuario: any){
    return addDoc(this.listLogUsuariosCollectionReference, usuario);
  }
  //Bajas
  

  //Modificar
  modificarEspecialista(especialista:any,id:any){
    const especialistaDocRef = doc(this.FireStore, `especialistas/${id}`);
    return updateDoc(especialistaDocRef,especialista);
  }

  modificarTurno(turno:any,id:any){
    const turnoDocRef = doc(this.FireStore, `turnos/${id}`);
    return updateDoc(turnoDocRef,turno);
  }

  //Listados
  listaAdministradores():Observable<any[]>{
    return collectionData(this.listAdministradoresCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  listaEspecialistas():Observable<any[]>{
    return collectionData(this.listEspecialistasCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  listaPacientes():Observable<any[]>{
    return collectionData(this.listPacientesCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  listaTurnos():Observable<any[]>{
    return collectionData(this.listTurnosCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  listaHistorialesClinicos():Observable<any[]>{
    return collectionData(this.listHistoriasCLinicasCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  listaLogUsuarios(): Observable<any[]>{
    return collectionData(this.listLogUsuariosCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }
}
