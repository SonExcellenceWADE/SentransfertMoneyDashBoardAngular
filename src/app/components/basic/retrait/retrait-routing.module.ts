import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetraitComponent } from './retrait.component';


const routes: Routes = [
  {
    path: '',
    component: RetraitComponent,
    data: {
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetraitRoutingModule { }
