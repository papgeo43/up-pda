import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableOptionsComponent } from './table/table-options/table-options.component';

const routes: Routes = [{
  path:'options',component: TableOptionsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
