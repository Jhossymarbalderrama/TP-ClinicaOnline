import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = {}; // ! User Log

  userDateFirebase: any;

  fotosAccesosRapidos: any = [];

  constructor(
    public afAuth: AngularFireAuth
  ) {

  }


  /**
   * Verificacion de Email por Firebase Users 
   * @returns 
   */
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }


  /**
   * Login de usuarios
   * @param email email del usuario
   * @param password contraseña del usuario
   * @returns 
   */
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem("Login", JSON.stringify({email: email, password: password}))
      this.userDateFirebase = result;
      return result;
    } catch (error) {
      return error;
    }
  }

  /**
   * Registro de Usuario
   * @param email email del usuario
   * @param password contraseña del usuario
   */
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.sendVerificationEmail();
    } catch (error) {
    }
  }

  /**
   * Logout de Usuario
   */
  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem("Login");
    } catch (error) {
    }
  }
}
