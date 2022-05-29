import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  selectedItems: any[] = [];
  hasDataFromRequest: boolean;
  changeOption: boolean;
  isNotSaved: boolean;
  total: number;
  @Output() totalEvent = new EventEmitter();

  @ViewChild('matRef') matRef: MatSelect;
  dropDownOptions = menu.map(x => {
    return { ...x }
  })
  constructor(private http: HttpClient, private dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.http.get(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`).pipe(
      tap((hasData) => {
        if (hasData) {
          this.hasDataFromRequest = true;
          console.log(hasData);
          let merged = [].concat.apply([], (<any>Object).values(hasData));
          this.selectedItems = [...merged];
          this.calculateTotal();
        }
      })
    ).subscribe();
  }


  changeClient(data: any) {
    const findObj = this.dropDownOptions.find(obj => obj.item === data);
    if (findObj) {
      this.selectedItems.push(findObj);
    }
    this.calculateTotal();
    this.matRef.options.forEach((data: MatOption) => data.deselect());
    this.changeOption = true;
  }

  saveOrder() {
    if (this.changeOption) {
      if (this.hasDataFromRequest) {
        this.http.put(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`, this.selectedItems)
         .subscribe( result => {
          // success
          this.showNotification(notification.success, notification.closeAction, notification.backgroundSuccess);
        },
        err => {
          // some error happened
          this.showNotification(notification.error, notification.closeAction, notification.backgroundError);
        })
      } else {
        this.http.post(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`, this.selectedItems).subscribe( result => {
          // success
          this.showNotification(notification.success, notification.closeAction, notification.backgroundSuccess);
        },
        err => {
          // some error happened
          this.showNotification(notification.error, notification.closeAction, notification.backgroundError);
        })
      }
    }
  }

  increaseItemQuantity(order: Order) {
    const priceToIncrease = menu.find((itemName) => itemName.item === order.item);
    priceToIncrease?.price ? order.price = order.price + priceToIncrease?.price : null;
    order.itemQuantity = order.itemQuantity + 1;
    this.changeOption = true;
    this.calculateTotal();
    console.log(this.total)
  }
  
  decreaseItemQuantity(order: Order) {
    if (order.itemQuantity > 1) {
      const priceToIncrease = menu.find((itemName) => itemName.item === order.item);
      (priceToIncrease?.price) ? order.price = order.price - priceToIncrease?.price : null;
      order.itemQuantity = order.itemQuantity - 1;
      this.changeOption = true;
      this.calculateTotal();
      console.log(this.total)
    }
  }

  calculateTotal() {
    this.total = this.selectedItems.reduce((x, item) => x + item.price, 0);
  }

  payTable() {
    this.http.delete(`https://up-in-smoke-waiter-default-rtdb.firebaseio.com/table-${this.data.id}.json`).subscribe( result => {
      // success
      this.showNotification(notification.paySuccess, notification.closeAction, notification.backgroundSuccess);
      this.dialogRef.close();

    },
    err => {
      // some error happened
      this.showNotification(notification.payError, notification.closeAction, notification.backgroundSuccess);
    })

  }

  delete(item: string) {
    this.selectedItems.splice(this.selectedItems.findIndex(order => order.item === item), 1);
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
