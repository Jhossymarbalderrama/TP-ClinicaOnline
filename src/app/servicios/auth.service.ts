import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = '';
  userDateFirebase: any;
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
      //console.log(this.user);
      this.userDateFirebase = result;
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
