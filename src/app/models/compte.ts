export class Compte {
    id?: number
    solde: number
      partenaire: {
          ninea: string,
          rccm: string,
          tel: string,
          email: string,
          raisonSociale: string,
          adresse: string,
          capital: number,
          userPartenaire: [
            {
              username: string,
              password: string,
              confirmPassword: string,
              prenom: string,
              nom: string,
              email: string,
              userRole: string
           }
  
          ]
     }
    }
  