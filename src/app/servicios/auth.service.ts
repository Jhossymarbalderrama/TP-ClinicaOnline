import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Despues de tester dejar en ""
  user: any =  "";

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
