import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {WOW} from 'wowjs/dist/wow.min.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  quote = 'Just quote';
  user = {
    username: null,
    password: null
  };
  // modalFormLoginEmail = new FormControl('', Validators.email);
  // modalFormLoginPassword = new FormControl('', Validators.required);
  // modalFormRegisterEmail = new FormControl('', Validators.email);
  // modalFormRegisterPassword = new FormControl('', Validators.required);
  // modalFormRegisterRepeatPassword = new FormControl('', Validators.required);

  constructor(private auth: AuthService, private http: HttpClient) {

  }

  ngOnInit() {
    new WOW().init();
  }

  submitUserData() {
    this.auth.auth(this.user.username, this.user.password);
  }

}
