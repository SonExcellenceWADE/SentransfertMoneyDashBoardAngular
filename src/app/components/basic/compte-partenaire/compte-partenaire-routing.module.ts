import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComptePartenaireComponent } from './compte-partenaire.component';

const routes: Routes = [
  {
    path: '',
    component: ComptePartenaireComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptePartenaireRoutingModule { }
