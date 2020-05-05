import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepotComponent } from './depot.component';


const routes: Routes = [
  {
    path: '',
    component: DepotComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepotRoutingModule { }
