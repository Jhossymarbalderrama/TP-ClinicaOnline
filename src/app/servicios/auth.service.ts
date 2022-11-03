import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Despues de tester dejar en ""
  user: any =  {
    "nombre": "manuel",
    "apellido": "marin",
    "foto": "https://firebasestorage.googleapis.com/v0/b/tp-clinicaonline-ef480.appspot.com/o/d9b415fc9f697854606d04a63331b727.jpg?alt=media&token=98bf0f3f-98de-43e0-aeb4-e53abc65b660",
    "tipoUsuario": "ESP",
    "especialidad": [
        "Cardiología"
    ],
    "habilitado": true,
    "dni": 42254566,
    "horarioS": [
        "12:00 a 12:30",
        "13:30 a 14:00"
    ],
    "mail": "manuel@gmail.com",
    "id": "YlMCL9xvzpVyHilNa58Z",
    "password": "Manuel159",
    "horarioLV": [
        "8:00 a 8:30",
        "9:30 a 10:00"
    ],
    "edad": 42
};

  //ADMINISTRADOR
//   {
//     "password": "Pedro159",
//     "nombre": "pedro",
//     "apellido": "lopez",
//     "tipoUsuario": "ADM",
//     "mail": "pedro@gmail.com",
//     "edad": 30,
//     "foto": "https://firebasestorage.googleapis.com/v0/b/tp-clinicaonline-ef480.appspot.com/o/B.png?alt=media&token=fe1aa44b-a3a4-46b6-8ae9-1e409aaf334d",
//     "dni": 54545554,
//     "id": "RPALQYrlwcGwc3KUjdyl"
// };

  userDateFirebase: any;

  fotosAccesosRapidos: any = [];
  
  constructor(
    public afAuth: AngularFireAuth
  ) { }


  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password:string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );      
      
      this.userDateFirebase = result;
      //console.log(this.user);
      return result;

    } catch (error) {      
      //console.log(error);
      return error;
    }
  }

  async register(email: string, password: string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.sendVerificationEmail();
    } catch (error) {
      //console.log(error);
    }
  }

  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      //console.log(error);
    }
  }
}
