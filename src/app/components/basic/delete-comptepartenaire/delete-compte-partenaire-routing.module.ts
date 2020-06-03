import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComptepartenaireComponent } from './delete-comptepartenaire.component';

const routes: Routes = [
  {
    path: '',
    component: DeleteComptepartenaireComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteComptePartenaireRoutingModule { }
