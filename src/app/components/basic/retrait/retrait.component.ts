import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../../../services/compte.service';
import { TransactionService } from '../../../services/transaction.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {

  comptes;
  transaction;
  idRetrait;
  error: string;
  errorToken: string;
  submitted = false;
  retraitForm: FormGroup;
  constructor( 
    private CompteService: CompteService,
    private TransactionService: TransactionService,
    private router: Router,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<RetraitComponent>
    ) { }

  ngOnInit() {

     //recuperation des donnees du Transaction Partenaire By son excellence WADE

     this.retraitForm = new FormGroup({
      cinBeneficiaire: new FormControl('',Validators.required),
      codeEnvoi: new FormControl('', Validators.required)
     })

      //function de recuperation de la liste des comptes BY Son Excellence WADE

      this.CompteService.findAllComptes().subscribe(

        data => {
          this.comptes = data['hydra:member'];
          console.log(this.comptes);
          
        })

        //Appel de Function de chargement des infos de la Transaction By Son Excellence WADE
 this.onChanges();

        }
  //function de charge des donnees de la transaction dynamiquement By Son Excellence WADE
        onChanges(){
          this.retraitForm.get('codeEnvoi').valueChanges.subscribe(
            
          val => {
            if(val){
              this.dataTransactionByCodeEnvoi(val);
            } 
            }
         );
        }  

        //Recuperation des donnees du Compte Partenaire par recherche de Code Envoi By Son Excellence WADE

dataTransactionByCodeEnvoi(codeEnvoi){

  //recupereration du codeEnvoi saisie dans le formulaire By Son Excellence WADE;
  this.TransactionService.searchByCodeEnvoi(codeEnvoi).subscribe(

    data => { 

      //On test si la recherche par Nº de Compte est vrai
       if(data["hydra:member"][0])
       {
          this.transaction = data["hydra:member"][0];
         console.log(this.transaction);
         //recuperation de l'id de la transaction By Son Excellence WADE
         this.idRetrait = this.transaction.id;
       }else{
         alert("Ce Code est invalide...");
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


//function de Transaction par Envoie BY Son Excellence WADE

onRetrait(){

  console.log(this.retraitForm.value);

  this.TransactionService.retraitTransaction(this.retraitForm.value, this.idRetrait).subscribe(

    data => {
      if(data){
        alert("Montant retiré avec succées...");
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
 


//Function de control des champs de saisies BY Son Excellence WADE

get f() { return this.retraitForm.controls; }


onSubmit() {
 this.submitted = true;

// réinitialiser les alertes lors de la soumission BY Son Excellence WADE
 this.alertService.clear();

 // s'arrête ici si le formulaire n'est pas valide BY Son Excellence WADE
 if(this.retraitForm.invalid) {
     return;
 }

//Function de recuperation d'alerte service By Son Excellence WADE

this.TransactionService.depotTransaction(this.retraitForm.value)
   .subscribe(
   data=>{
     console.log(data);
   },
  error => {
  this.alertService.error(error);
           
  });
}

  }


  


  




