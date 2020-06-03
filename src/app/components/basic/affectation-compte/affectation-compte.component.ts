import { DialogService } from './../../../services/dialog.service';
import { ListUserComponent } from './../list-user/list-user.component';
import { ListComptepartenaireComponent } from './../list-comptepartenaire/list-comptepartenaire.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { CompteService } from '../../../services/compte.service';
import { AffectationCompteService } from '../../../services/affectation-compte.service';

@Component({
  selector: 'app-affectation-compte',
  templateUrl: './affectation-compte.component.html',
  styleUrls: ['./affectation-compte.component.scss'],
})
export class AffectationCompteComponent implements OnInit {

affectationForm: FormGroup;
error: string;
errorToken: string;
iriCompte ;
iriUserAffectCompte =`/api/users/`;
id;
user;
compte;
thumbail;

  constructor(
    private affectationService: AffectationCompteService,
    private router: Router,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AffectationCompteComponent>,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private userService: UserService,
    private compteService: CompteService,
    private route: ActivatedRoute
  ) { }

  searchKey: string;

  ngOnInit() {

     //recuperation des donnees Affectation Compte Partenaire By son excellence WADE

     this.affectationForm = new FormGroup({
     dateDebut : new FormControl('yyyy-MM-dd', Validators.required), 
     dateFin: new FormControl('',Validators.required),
     compte: new FormControl('', Validators.required),
     userAffectCompte: new FormControl('', Validators.required),
    });


     //nous obtiendrons les paramètres de route à l'aide de la méthode snapshot.param.
   // La méthode d'instantané est accessible à l'aide du service ActivatedRoute dans Angular.
   //Le service ActivatedRoute vous aide à surveiller l'itinéraire actuellement activé associé au composant actuellement lancé.
   //recuperation de l'id de l'utilisateur via l'url de la route

   this.id = this.route.snapshot.params.id; 
  
   //Function pour afficher la liste d'un utilisateur selectionner BY Son Excellence WADE
   this.userService.findUserById(this.id)
   .subscribe(
     data=>{
      
       this.user = data;
       console.log(this.user);
       //this.thumbail = this.userService.getThumbnail(data)
     
     }
   )

  //Appel de Function de chargement des infos Comptes  By Son Excellence WADE
 this.dataCompteByNumCompte();
}

  /* onChanges(){
  this.affectationForm.get('compte').valueChanges.subscribe(
    
  val => {
    if(val){
      this.dataCompteByNumCompte();
    } 
    }
 );
} 
 */
  //Recuperation des donnees du Compte Partenaire par recherche de Nº de Compte By Son Excellence WADE

dataCompteByNumCompte(){

  //recupereration du numero de compte saisie dans le formulaire By Son Excellence WADE;
  this.compteService.searchByNumCompte(this.affectationForm.value.compte).subscribe(
    data => {
      
      //On test si la recherche par Nº de Compte est vrai
       if(data["hydra:member"][0])
       {
         
           //Recuperation de l'iri du Compte Partenaire
          this.iriCompte = data["hydra:member"][0]['@id'];
          console.log(this.affectationForm.value.compte);
          //console.log(this.iriCompte);
       }else{
         alert("Ce numéro de compte est invalide...");
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


  //Function AffectationCompte BY Son Excellence WADE

onAffecteCompte(){
  //Formatage des dates de debut et  de fin en format y-M-d By Son Excellence WADE
this.affectationForm.value.dateDebut = this.datepipe.transform(this.affectationForm.value.dateDebut, 'y-MM-d');
this.affectationForm.value.dateFin = this.datepipe.transform(this.affectationForm.value.dateFin, 'y-MM-d');

//recuperation de l'iri de UserAffectCompte BY Son Excellence WADE
this.affectationForm.value.userAffectCompte = `${this.iriUserAffectCompte}${this.user.id}`;
console.log(this.affectationForm.value);
//recuperation de l'iri de Compte BY Son Excellence WADE
this.affectationForm.value.compte = this.iriCompte;

this.affectationService.affectCompte(this.affectationForm.value).subscribe(
  data => {
    
    if(data){
      alert("Affectation effectuée avec succées...");
      return this.router.navigateByUrl('/listAffectationCompte');
    }
  },
  errormsgHttp=>{
   //function de dump des donnes de l'entete API Backend By Son Excellence WADE
     console.log(errormsgHttp);

     //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
      this.error = errormsgHttp.error["hydra:description"];

     //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
      alert(this.error); 
    
      if(errormsgHttp.error['hydra:description'] == "Acces Refuse. Vous ne pouvez pas faire une affectation de compte"){
        return this.router.navigateByUrl('');
      }
   
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


//Function de l'appel liste des utilisateurs pour Affectation BY Son Excellence 

onListUser(){
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "80%";
  dialogConfig.height = "70%";
  this.dialog.open(ListUserComponent, dialogConfig);
}


}





