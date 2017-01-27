import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { Login } from '../login/login';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent  {
  constructor(
    public af: AngularFire,
    private router: Router
    ) {}
  signedIn:boolean = true;
  name = 'login';
    credentials: Login = {
    email: 'a@a.com',
    password: '123456'
  };
  signinUser(credentials: Login): void {
    console.log(credentials);
    this.af.auth.login({
      email: credentials.email,
      password: credentials.password,
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(()=>{
        console.log('signed in')
        this.router.navigate(['/home']);
      });
    this.signedIn = false;
  }
}
