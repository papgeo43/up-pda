import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; import { TableOptionsComponent } from './table-options/table-options.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() table: any
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
console.log(this.table, "table")
  }

  openDialog() {
    this.dialog.open(TableOptionsComponent, {
      data: {
        id: this.table
      }
    }
    );
  }

}

