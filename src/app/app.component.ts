import { Component } from '@angular/core';
import { slideInAnimation } from './app.animation';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'TP_Final_Clinica';
  constructor( ){
  }

}
