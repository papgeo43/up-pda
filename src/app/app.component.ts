import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {tap} from 'rxjs/operators'
import { LoginService } from './login.service';
import { PassTotalService } from './pass-total.service';
import { TotalTableComponent } from './table/table-options/total-table/total-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'up-in-smoke-pda-app';
  endPointIds: any[] = [];
  
  tables = ['E1','E2','E3','E4','E5','E6','E7','E8','E9', 'E10',2,3,4,5,6,7,8,'8MIΣΗ',9,10,11,12,13]
 constructor(public loginSvc: LoginService, public passTotalService: PassTotalService, public dialog: MatDialog) {
 }
  ngOnInit(){
    this.loginSvc.isUserSignedIn()
  }

   dialogRef() {

     this.dialog.open(TotalTableComponent, {
       height: '800px',
       width: '600px',
       data: this.tables
      });
    } 
}
