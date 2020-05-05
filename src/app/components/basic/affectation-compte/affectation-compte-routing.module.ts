import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffectationCompteComponent } from './affectation-compte.component';

const routes: Routes = [
  {
    path: '',
    component: AffectationCompteComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationCompteRoutingModule { }
