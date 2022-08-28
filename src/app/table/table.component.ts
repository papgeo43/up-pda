import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { TableOptionsComponent } from './table-options/table-options.component';
import { PassTotalService } from '../pass-total.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() table: any
  price = 0;
  constructor(private http: HttpClient, public passTotalService: PassTotalService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-${this.table}.json`).pipe(
      tap((hasData) => {
        if(hasData){
          let merged = [].concat.apply([], (<any>Object).values(hasData));
          this.price = merged.reduce((x, item:any) => x + item.price, 0);
        }
      })
    ).subscribe();
  }

  openDialog() {
    this.dialog.open(TableOptionsComponent, {
      minWidth: "408px",
      data: {
        id: this.table
      }
    }
    )
    .afterClosed().pipe(
      switchMap(()=> this.passTotalService.calculateTablePrice),
      tap(x=> {
        if(x.table === this.table){
          this.price = x.totalValue
        }
      })).subscribe();
    
  }
}

