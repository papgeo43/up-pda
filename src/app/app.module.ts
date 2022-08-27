import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableOptionsComponent } from './table/table-options/table-options.component';
import { TableComponent } from './table/table.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';


const firebaseConfig = {
  apiKey: "AIzaSyBV5-1EnovAmQ0DmpE1UZEMNZCS-n9aA5k",
  authDomain: "upsmoke-fd707.firebaseapp.com",
  databaseURL: "https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "upsmoke-fd707",
  storageBucket: "upsmoke-fd707.appspot.com",
  messagingSenderId: "99880407628",
  appId: "1:99880407628:web:fb288cb863b6acfdf6dae9",
  measurementId: "G-27P3SC8CQK"
};


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableOptionsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(firebaseConfig) 
   ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
