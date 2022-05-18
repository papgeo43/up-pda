import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.css']
})
export class TableOptionsComponent implements OnInit {
  selectedItems: any[] = [];
  hasDataFromRequest: boolean;
  changeOption: boolean;
  @ViewChild('matRef') matRef: MatSelect;
  dropDownOptions = ['coffee', 'beer', 'cocktail'];
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.http.get(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`).pipe(
      tap((hasData) => {
        if(hasData){
          this.hasDataFromRequest = true;
         let merged = [].concat.apply([], (<any>Object).values(hasData));
         this.selectedItems = [...merged];
        }
      })
    ).subscribe();
  }

  changeClient(data: string) {
    this.selectedItems.push(data);
    this.matRef.options.forEach((data: MatOption) => data.deselect());
    this.changeOption = true;
  }
  
  saveOrder() {
    if(this.changeOption){
      if(this.hasDataFromRequest){
        this.http.put(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`, this.selectedItems).subscribe(x => console.log(x, 'lala post'))
      }else{
        this.http.post(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`, this.selectedItems).subscribe(x => console.log(x, 'lala post'))
      }
    }
  }
}
