import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { PassTotalService } from 'src/app/pass-total.service';
import { menu } from '../../menu';
export interface Order {
  item: string,
  price: number,
  itemQuantity: number
} 

export const notification = {
  success: 'Η παραγγελία αποθηκεύτηκε.',
  error:'η παραγγελία δεν αποθηκεύτηκε.',
  closeAction: 'Close',
  backgroundSuccess: 'green-snackbar',
  backgroundError: 'red-snackbar',
  paySuccess: 'Η πληρωμή αποθηκεύτηκε.',
  payError: 'Δεν έγινε δεκτή η πληρωμή.'
}
@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.css']
})
export class TableOptionsComponent implements OnInit {
  selectedItems: Order[] = [];
  hasDataFromRequest: boolean;
  changeOption: boolean;
  isNotSaved: boolean;
  total: number;
  
  @ViewChild('matRef') matRef: MatSelect;
  dropDownOptions = menu.map(x => {
    return { ...x }
  })
  constructor(private http: HttpClient, private passTotal: PassTotalService, private dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.http.get(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-${this.data.id}.json`).pipe(
      tap((hasData) => {
        if (hasData) {
          this.hasDataFromRequest = true;
          let merged = [].concat.apply([], (<any>Object).values(hasData));
          this.selectedItems = [...merged];
          this.calculateTotal();
          this.passTotalToParent()
        }
       
      })
    ).subscribe();
  }


  changeClient(data: any) {
    const findObj = menu.find(obj => obj.item === data);
    if (findObj) {
      const copyObj = {...findObj}
      this.selectedItems.push(copyObj);
      this.changeOption = true;
    }
    this.calculateTotal();
    this.matRef.options.forEach((data: MatOption) => data.deselect());
  }

  saveOrder() {
    if (this.changeOption) {
      if (this.hasDataFromRequest) {
        this.http.put(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-C${this.data.id}.json`, this.selectedItems).subscribe()
        this.http.put(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-${this.data.id}.json`, this.selectedItems)
         .subscribe( result => {
          // success
          this.showNotification(notification.success, notification.closeAction, notification.backgroundSuccess);
          this.passTotalToParent();
        },
        err => {
          // some error happened
          this.showNotification(notification.error, notification.closeAction, notification.backgroundError);
        })
      } else {
        this.http.post(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-C${this.data.id}.json`, this.selectedItems).subscribe()
        this.http.post(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-${this.data.id}.json`, this.selectedItems).subscribe( result => {
          // success
          this.showNotification(notification.success, notification.closeAction, notification.backgroundSuccess);
          this.passTotalToParent();
        },
        err => {
          // some error happened
          this.showNotification(notification.error, notification.closeAction, notification.backgroundError);
        })
      }
      this.dialogRef.close(this.total);
    }
  }



  increaseItemQuantity(order: Order) {
    const priceToIncrease = menu.find((itemName) => itemName.item === order.item);
    priceToIncrease?.price ? order.price = order.price + priceToIncrease?.price : null;
    order.itemQuantity = order.itemQuantity + 1;
    this.changeOption = true;
    this.calculateTotal();
  }
  
  decreaseItemQuantity(order: Order) {
    if (order.itemQuantity > 1) {
      const priceToIncrease = menu.find((itemName) => itemName.item === order.item);
      (priceToIncrease?.price) ? order.price = order.price - priceToIncrease?.price : null;
      order.itemQuantity = order.itemQuantity - 1;
      this.changeOption = true;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.selectedItems.reduce((x, item) => x + item.price, 0);
  }
  
  passTotalToParent(){
    this.passTotal.calculateTablePrice.next({table: this.data.id, totalValue: this.total })
  }

  payTable() {
    this.http.delete(`https://upsmoke-fd707-default-rtdb.europe-west1.firebasedatabase.app/table-${this.data.id}.json`).subscribe( result => {
      // success
      this.showNotification(notification.paySuccess, notification.closeAction, notification.backgroundSuccess);
      this.passTotal.calculateTablePrice.next({table: this.data.id, totalValue: 0 })
      this.dialogRef.close();

    },
    err => {
      // some error happened
      this.showNotification(notification.payError, notification.closeAction, notification.backgroundError);
    })

  }

  delete(item: string, itemArray: Order[]) {
    itemArray.splice(itemArray.findIndex(order => order.item === item), 1);
    this.calculateTotal();
    this.changeOption = true;
  }

  showNotification(message: string, action: string, className: string){
    this.snackBar.open(message, action,{
      duration:1500,
      horizontalPosition:'start',
      verticalPosition: 'top',
      panelClass: [className]
    })
  }

}
