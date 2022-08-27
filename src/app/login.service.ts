import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  constructor(private fireBaseAuth: AngularFireAuth) { }

  async signin(email:string, password:string){
   const user = await this.fireBaseAuth.signInWithEmailAndPassword(email, password)
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(user.user));
      
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
