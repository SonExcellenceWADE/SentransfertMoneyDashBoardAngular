import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Menu Principal',
    main: [
      {
        state: 'dashboard',
        name: 'Tableau de Bord',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  },

  //Users Group BY SON EXCELLENCE WADE
  {
    label: 'Gestions Utilisateurs',
    main: [
      {
        state: 'basic',
        name: 'Utilisateurs',
        type: 'sub',
        icon: 'ti-user',
        children: [
         
          {
            state: 'createUser',
            name: 'Ajouter un utilisateur'
          },

          {
            state: 'listUser',
            name: 'Liste des utilisateurs'
          }
        ]
      },
    ]
  },


//Account Partner Group BY SON EXCELLENCE WADE

{
  label: 'Gestions des Comptes',
  main: [
    {
      state: 'basic',
      name: 'Comptes Partenaires',
      type: 'sub',
      icon: 'ti-id-badge',
      children: [
       
        {
          state: 'compte',
          name: 'Ajouter un compte'
        },

        {
          state: 'listCompte',
          name: 'Liste des comptes'
        },
      ]
    },
  ]
},


//Depot Group BY SON EXCELLENCE WADE

{
  label: 'Gestions Dépots',
  main: [
    {
      state: 'basic',
      name: 'Dépots de Solde',
      type: 'sub',
      icon: 'ti-money',
      children: [
       
        {
          state: 'faireDepot',
          name: 'Faire Dépôts'
        },

        {
          state: 'listDepot',
          name: 'Liste des Dépôts'
        },
      ]
    },
  ]
},

//Affectation Compte Group BY SON EXCELLENCE WADE

{
  label: 'Gestions Affectations',
  main: [
    {
      state: 'basic',
      name: 'Affectation Comptes',
      type: 'sub',
      icon: 'ti-layers-alt',
      children: [
       
        {
          state: 'affectationCompte',
          name: 'Affectation de Compte'
        },

        {
          state: 'listAffectationCompte',
          name: 'Liste des Affectations'
        },
      ]
    },
  ]
},

//Transaction Group BY SON EXCELLENCE WADE

{
  label: 'Gestions Transactions',
  main: [
    {
      state: 'basic',
      name: 'Envoyer / Recevoir de l\'argent',
      type: 'sub',
      icon: 'ti-reload',
      children: [
       
        {
          state: 'envoie',
          name: 'Envoyer de l\'argent'
        },

        {
          state: 'retrait',
          name: 'Retirer de l\'argent'
        },

        {
          state: 'listTransaction',
          name: 'Liste des Transactions'
        },
      ]
    },
  ]
},

//Localisation MAPS Agence BY SON EXCELLENCE WADE

{
  label: 'Localisation des Agences',
  main: [
    {
      state: 'map',
      name: 'Agence Maps',
      type: 'link',
      icon: 'ti-location-pin'
    }
  ]
}

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
