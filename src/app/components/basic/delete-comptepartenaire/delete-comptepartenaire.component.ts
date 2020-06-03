
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompteService } from '../../../services/compte.service';

@Component({
  selector: 'app-delete-comptepartenaire',
  templateUrl: './delete-comptepartenaire.component.html',
  styleUrls: ['./delete-comptepartenaire.component.scss']
})
export class DeleteComptepartenaireComponent implements OnInit {
 
error: string;
  id;
  constructor(private CompteService: CompteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {


    // Nous obtiendrons les paramètres de route à l'aide de la méthode snapshot.param.
   // La méthode d'instantané est accessible à l'aide du service ActivatedRoute dans Angular.
   // Le service ActivatedRoute vous aide à surveiller l'itinéraire actuellement activé associé au composant actuellement lancé.
   
  this.id = this.route.snapshot.params.id; //recuperation de l'id de l'utilisateur via l'url de la route
 console.log(this.CompteService.deleteComptePartenaire(this.id));
  this.CompteService.deleteComptePartenaire(this.id)
   .subscribe(
     data => {
        if(data){
          alert("Suppression Réussie...")
        }
      this.router.navigateByUrl("/listCompte");    
     },
     errormsgHttp=>{
      //function de dump des donnes de l'entete API Backend By Son Excellence WADE
        console.log(errormsgHttp);

        //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
         this.error = errormsgHttp.error["hydra:description"];

        //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
         alert(this.error); 
       }
   )
   
 }
  }


