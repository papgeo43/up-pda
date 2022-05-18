import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'up-in-smoke-pda-app';
  endPointIds: any[] = [];
 
  tables = [1,2,3,4,5,6,7,8,9]
 constructor(private http: HttpClient) {
 }
  ngOnInit(){
    // this.http.get('https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table.json').pipe(
    //   tap(x=>{
    //     this.endPointIds = [...Object.keys(x)];
    //     console.log(this.endPointIds,"f")      
    //   })
    // ).subscribe()

  }
}
