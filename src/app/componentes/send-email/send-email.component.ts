import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers: [AuthService]
})
export class SendEmailComponent implements OnInit {

  user$: Observable<any> = this.AuthService.afAuth.user; 

  constructor(
    private AuthService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSendEmail(){
    this.AuthService.sendVerificationEmail();
  }
}
