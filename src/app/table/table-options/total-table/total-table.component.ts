import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { PassTotalService } from '../../../pass-total.service';
import { notification } from '../table-options.component';

@Component({
  selector: 'app-total-table',
  templateUrl: './total-table.component.html',
  styleUrls: ['./total-table.component.css']
})
export class TotalTableComponent implements OnInit {
  @Input() tables: any
  constructor(private http: HttpClient,private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  totalItems = []
  calc$ = new BehaviorSubject<number>(0);
  ngOnInit(): void {
    console.log(this.data)
    const obs = this.data.map((x: any) => this.http.get(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-C${x}.json`))
    forkJoin(obs).pipe(
      map((x:any) =>  this.removeNullValues(x)),
      tap((x:any)=>{
       this.calc(x)
      })
    )
    .subscribe(results => {
      this.totalItems = results;
    });
  }

  removeNullValues(obsArr: any){
    const arrayOfObs = obsArr.filter((x:any) => x !== null);
    const removeHashFromArr = arrayOfObs.map((x:any)=> [].concat.apply([], (<any>Object).values(x)));
    return removeHashFromArr;
  }
  calc(x:any){
    let sum = 0
    x.forEach((element:any) => {
      element.forEach((tab:any) => {
        console.log(tab.price)
        sum = sum + tab.price;
      });        
      });
    this.calc$.next(sum) 
 }

 payAll(){
  this.data.forEach((id:any) => {
    this.http.delete(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-C${id}.json`).subscribe(()=>{
      this.dialogRef.close();

    });
   // success
    }) 
  }
}
