import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GoogleMapComponent} from './google-map.component';

const routes: Routes = [
  {
    path: '',
    component: GoogleMapComponent,
    data: {
      breadcrumb: 'SenTransfertMoney Agence',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleMapRoutingModule { }
