import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc,collectionData,doc,deleteDoc} from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Administrador } from '../clases/administrador';
import { Especialista } from '../clases/especialista';
import { Paciente } from '../clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  storage: any;

  listAdministradoresCollectionReference: any;
  listEspecialistasCollectionReference: any;
  listPacientesCollectionReference: any;

  constructor(
    public FireStore: Firestore
  ) { 
    this.storage = getStorage();

    this.listAdministradoresCollectionReference = collection(this.FireStore,'administradores');
    this.listEspecialistasCollectionReference = collection(this.FireStore,'especialistas');
    this.listPacientesCollectionReference = collection(this.FireStore,'pacientes');
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


  //Bajas
  

  //Modificar
  modificarEspecialista(especialista:any,id:any){
    const especialistaDocRef = doc(this.FireStore, `especialistas/${id}`);
    return updateDoc(especialistaDocRef,especialista);
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

}
