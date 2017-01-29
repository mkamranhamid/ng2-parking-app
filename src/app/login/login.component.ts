import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { Login, SignupSchema } from '../login/login';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  users: FirebaseListObservable<any[]>;
  constructor(
    public af: AngularFire,
    private router: Router,
    public snackBar: MdSnackBar
    ) {
      this.users = af.database.list('/users');
    }
  signedIn:boolean = true;
  credentialsignup:any;
  snackbarmessage: string;
  name = 'login';
  credentials: Login = {
    email: 'a@a.com',
    password: '123456'
  };
  signupuser: SignupSchema = {
    email: '',
    password: '',
    name: '',
    username: ''
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
  signupUser(credentials):void{
    var creds: any = { email: credentials.email, password: credentials.password };
    this.af.auth.createUser(creds).then((userCreated) => {
      delete credentials.password;
      credentials.uid = userCreated.uid;
      credentials.role = 'user';
      this.users.push(credentials);
      this.snackbarmessage = `user ${credentials.name} created`;
      this.snackBar.open(this.snackbarmessage, 'Done', {
        duration: 2000,
      });
      this.router.navigate(['/home']);
      console.log('userCreated', userCreated)
    },(error)=>{
      this.snackbarmessage = `ERROR: while creating user ${credentials.name}`;
      this.snackBar.open(this.snackbarmessage, 'Dance', {
      duration: 2000,
    });
      console.log('userCreation error')
    });
  }
}
