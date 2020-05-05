import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAffectationCompteComponent } from './list-affectation-compte.component';

const routes: Routes = [
  {
    path: '',
    component: ListAffectationCompteComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAffectationCompteRoutingModule { }
