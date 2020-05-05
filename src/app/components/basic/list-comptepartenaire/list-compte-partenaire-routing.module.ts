import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComptepartenaireComponent } from './list-comptepartenaire.component';

const routes: Routes = [
  {
    path: '',
    component: ListComptepartenaireComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListComptePartenaireRoutingModule { }
