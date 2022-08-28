import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators'
import { LoginService } from './login.service';
import { PassTotalService } from './pass-total.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'up-in-smoke-pda-app';
  endPointIds: any[] = [];
  
  tables = ['E1','E2','E3','E4','E5','E6','E7','E8','E9', 'E10',1,2,3,4,5,6,7,8,9,10,11,12,13]
 constructor(public loginSvc: LoginService, public passTotalService: PassTotalService) {
 }
  ngOnInit(){
    this.loginSvc.isUserSignedIn()
    // this.http.get('https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table.json').pipe(
    //   tap(x=>{
    //     this.endPointIds = [...Object.keys(x)];
    //     console.log(this.endPointIds,"f")      
    //   })
    // ).subscribe()

  }
}
