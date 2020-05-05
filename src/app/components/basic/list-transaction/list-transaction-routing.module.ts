import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTransactionComponent } from './list-transaction.component';


const routes: Routes = [
  {
    path: '',
    component: ListTransactionComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTransactionRoutingModule { }
