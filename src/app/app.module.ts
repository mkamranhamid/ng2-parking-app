import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BookingModalComponent } from './modal/bookingmodal.component';

const myFirebaseConfig = {
  apiKey: "AIzaSyAYeszP-tTk-NvUAaMipUZA3gf4dZOTJUs",
  authDomain: "parking-reservation-da6c0.firebaseapp.com",
  databaseURL: "https://parking-reservation-da6c0.firebaseio.com",
  storageBucket: "parking-reservation-da6c0.appspot.com",
  messagingSenderId: "437278806175"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Redirect
};

const appRoutes: Routes = [
  {
        path: '',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    BookingModalComponent
  ],
  entryComponents: [
    BookingModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
