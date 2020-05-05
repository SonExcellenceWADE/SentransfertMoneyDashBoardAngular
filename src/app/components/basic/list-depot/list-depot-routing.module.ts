import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepotComponent } from './list-depot.component';


const routes: Routes = [
  {
    path: '',
    component: ListDepotComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDepotRoutingModule { }
