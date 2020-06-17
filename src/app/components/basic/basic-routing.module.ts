
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      status: false
    },
    children: [
       {
        path: 'createUser',
        loadChildren: () => import('./createuser/createuser.module').then(m => m.CreateUserModule)
      },

      {
        path: 'listUser',
        loadChildren: () => import('./list-user/list-user.module').then(m => m.ListUserModule)
      },

      {
        path: 'updateUser/:id',
        loadChildren: () => import('./update-user/update-user.module').then(m => m.UpdateUserModule)
      },

      {
        path: 'compte',
        loadChildren: () => import('./compte-partenaire/compte-partenaire.module').then(m => m.ComptePartenaireModule)
      },

      {
        path: 'contrat',
        loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule)
      },

      {
        path: 'listCompte',
        loadChildren: () => import('./list-comptepartenaire/list-compte-partenaire.module').then(m => m.ListComptePartenaireModule)
      },

      {
        path: 'faireDepot',
        loadChildren: () => import('./depot/depot.module').then(m => m.DepotModule)
      },


      {
        path: 'faireDepot/compte/:id',
        loadChildren: () => import('./depot/depot.module').then(m => m.DepotModule)
      },

      {
        path: 'listDepot',
        loadChildren: () => import('./list-depot/list-depot.module').then(m => m.ListDepotModule)
      },

      {
        path: 'affectationCompte',
        loadChildren: () => import('./affectation-compte/affectation-compte.module').then(m => m.AffectationCompteModule)
      },

      {
        path: 'affectationCompte/Useraffect/:id',
        loadChildren: () => import('./affectation-compte/affectation-compte.module').then(m => m.AffectationCompteModule)
      },

      {
        path: 'listAffectationCompte',
        loadChildren: () => import('./list-affectation-compte/list-affectation-compte.module').then(m => m.ListAffectationCompteModule)
      },

      {
        path: 'envoie',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
      },

      {
        path: 'retrait',
        loadChildren: () => import('./retrait/retrait.module').then(m => m.RetraitModule)
      },

      {
        path: 'listTransaction',
        loadChildren: () => import('./list-transaction/list-transaction.module').then(m => m.ListTransactionModule)
      },


      {
        path: 'recuTransaction',
        loadChildren: () => import('./recu-transaction/recu-transaction.module').then(m => m.RecuTransactionModule)
      },

      {
        path: '/deleteCompte/:id',
        loadChildren: () => import('./delete-comptepartenaire/delete-compte-partenaire.module').then(m => m.DeleteComptePartenaireModule)
      },



      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
