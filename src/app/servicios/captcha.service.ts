import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  letrasPermitidas: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  constructor() { }


  generarPalabra(): string{
    let maxCadena: number = 5;
    let resultado: string = "";

    for (let i = 0; i < maxCadena; i++) {      
      resultado += this.letrasPermitidas.charAt(Math.floor(Math.random() * this.letrasPermitidas.length)); 
    }

    return resultado;  
  }
}
