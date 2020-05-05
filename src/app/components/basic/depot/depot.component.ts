import { ListComptepartenaireComponent } from './../list-comptepartenaire/list-comptepartenaire.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepotService } from '../../../services/depot.service';
import { CompteService } from '../../../services/compte.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

depotForm: FormGroup;
error: string;
errorToken: string;
partenaire: string;
iriCompte: string;
iricomptePartenaire = `/api/comptes/`;
numCompte: string;
montantDepot:string;
searchKey: string;
id;
compte;

  constructor(
    private depotService: DepotService,  
    private compteService: CompteService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DepotComponent>) { }

  ngOnInit() {

    //recuperation des donnees de Depots Partenaire By son excellence WADE

    this.depotForm = new FormGroup({
      compte: new FormControl('', Validators.required), 
      montantDepot: new FormControl(0,Validators.required)
     
    });

     //nous obtiendrons les paramètres de route à l'aide de la méthode snapshot.param.
   // La méthode d'instantané est accessible à l'aide du service ActivatedRoute dans Angular.
   //Le service ActivatedRoute vous aide à surveiller l'itinéraire actuellement activé associé au composant actuellement lancé.
   //recuperation de l'id de l'utilisateur via l'url de la route

   this.id = this.route.snapshot.params.id; 
   
    //Function pour afficher la liste d'un Compte Partenaire selectionner BY Son Excellence WADE
    this.compteService.findCompteById(this.id)
    .subscribe(
      data => {
        this.compte = data;
        console.log(this.compte);
 
      }
    )
     
 //Appel de Function de chargement des infos Partenaire By Son Excellence WADE
 this.onChanges();
}

  onChanges(){
  this.depotForm.get('compte').valueChanges.subscribe(
    
  val => {
    if(val){
      this.dataCompteByNumCompte(val);
    } 
    }
 );
}  

//Recuperation des donnees du Compte Partenaire par recherche de Nº de Compte By Son Excellence WADE

dataCompteByNumCompte(numCompte){

  //recupereration du ninea saisie dans le formulaire By Son Excellence WADE;
  this.compteService.searchByNumCompte(numCompte).subscribe(
    data => {
      
      //On test si la recherche par Nº de Compte est vrai
       if(data["hydra:member"][0])
       {
           //Recuperation de l'iri du Compte Partenaire
          this.iriCompte = data["hydra:member"][0]['@id'];

       }else{
         alert("Ce numéro de compte est invalide...");
         //Si ce numero de compte n'existe pas, on desctive le champ de saisie du montant de Depot BY Son Excellence WADE
         this.depotForm.get("montantDepot").disable();
       }
      },

      errormsgHttp=>{
        //function de dump des donnes de l'entete API Backend By Son Excellence WADE
          console.log(errormsgHttp);
    
          //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
           this.error = errormsgHttp.error["hydra:description"];

         
           //Affichage Message Token Expired
           this.errorToken = errormsgHttp.error['message'];

            if(this.errorToken == "Expired JWT Token"){
              alert("Votre session est expirée... Merci de se connecter à nouveau de votre compte");
              return this.router.navigateByUrl('');
            }else{
             //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
           alert(this.error); 
            }
       
          
       }
  );
}


//Function de Fiare de Depot By Son Excellence WADE

onDepot(){
      
   // this.depotForm.value.compte = this.iriCompte;

   this.depotForm.value.compte = `${this.iricomptePartenaire}${this.compte.id}`;

    console.log(this.depotForm.value);

  this.depotService.faireDepot( this.depotForm.value).subscribe(
    data => {
      
      if(data){
        alert("Dépot effectué avec succés...");
        return this.router.navigateByUrl('/listDepot');
      }
    },
    errormsgHttp=>{
     //function de dump des donnes de l'entete API Backend By Son Excellence WADE
       console.log(errormsgHttp);

       //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
        this.error = errormsgHttp.error["hydra:description"];

       //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
        alert(this.error); 

         //Affichage Message Token Expired
         this.errorToken = errormsgHttp.error['message'];

         if(this.errorToken == "Expired JWT Token"){
           alert("Votre session est expirée... Merci de se connecter à nouveau de votre compte");
           return this.router.navigateByUrl('');
         }else{
          //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
        alert(this.error); 
         }
    

    }    
  )
  
  this.onClose(); //Appel de la Function de Fermeture de la Fenetre Modale BY Son Excellence WADE
}
  
//Function de Fermeture du Fenetre Modale BY Son Excellence WADE
onClose(){
  this.dialogRef.close();
}


//Function pour effacer les saisies de la bare de recherche BY Son Excellence WADE
onSearchClear(){
  this.searchKey = "";
  //this.applyFilter(); //Call a function to Filter BY Son Excellence WADE
}

//Function de l'appel liste des comptes pour Affectation BY Son Excellence 

onListCompte(){

const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width = "80%";
dialogConfig.height = "70%";
this.dialog.open(ListComptepartenaireComponent, dialogConfig);
}

  
}




