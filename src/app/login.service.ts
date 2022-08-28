import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  errorMessage =' '
  constructor(private fireBaseAuth: AngularFireAuth) { }

  signin(email:string, password:string){
   const user$ =  from(this.fireBaseAuth.signInWithEmailAndPassword(email, password)).pipe(
     tap((user)=>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(user.user));
     }),
     catchError(()=>{
       this.errorMessage = 'Λάθος μειλ ή κωδικός.'
       return of(null)
     })
   ).subscribe()
  }

  async logout(){
      await this.fireBaseAuth.signOut();
      this.isLoggedIn = false;
      localStorage.removeItem('user');
  }

  isUserSignedIn(){
    const isUserLoggedIn = localStorage.getItem('user');
    (isUserLoggedIn) ? this.isLoggedIn = true : this.isLoggedIn = false;
    }
}
