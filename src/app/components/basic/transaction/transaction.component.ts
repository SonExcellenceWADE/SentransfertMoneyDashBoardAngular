import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../../../services/compte.service';
import { TransactionService } from '../../../services/transaction.service';
import { AlertService } from '../../../services/alert.service';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  comptes;
  error: string;
  errorToken: string;
  submitted = false;
  transactionForm: FormGroup;
  constructor( 
    private CompteService: CompteService,
    private TransactionService: TransactionService,
    private router: Router,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<TransactionComponent>
    ) { }

  ngOnInit() {

     //recuperation des donnees du Transaction Partenaire By son excellence WADE

     this.transactionForm = new FormGroup({
      prenomEnvoyeur: new FormControl('', Validators.required), 
      nomEnvoyeur : new FormControl('',Validators.required),
      telEnvoyeur : new FormControl('',Validators.required),
      montantEnvoi: new FormControl(0,Validators.required),
      prenomBeneficiaire : new FormControl('',Validators.required),
      nomBeneficiaire: new FormControl('',Validators.required),
      telBeneficiaire: new FormControl('',Validators.required)
     
    });

    //function de recuperation de la liste des comptes BY Son Excellence WADE

      this.CompteService.findAllComptes().subscribe(

        data => {
          this.comptes = data;
          console.log(this.comptes);
          
        }

      )

  }

  //function de Transaction par Envoie BY Son Excellence WADE

  onEnvoi(){

    console.log(this.transactionForm.value);

    this.TransactionService.depotTransaction(this.transactionForm.value).subscribe(

      data => {
        if(data){
          alert("Montant envoyé avec succées...");
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

get f() { return this.transactionForm.controls; }


onSubmit() {
 this.submitted = true;

// réinitialiser les alertes lors de la soumission BY Son Excellence WADE
 this.alertService.clear();

 // s'arrête ici si le formulaire n'est pas valide BY Son Excellence WADE
 if(this.transactionForm.invalid) {
     return;
 }

//Function de recuperation d'alerte service By Son Excellence WADE

this.TransactionService.depotTransaction(this.transactionForm.value)
   .subscribe(
   data=>{
     console.log(data);
   },
  error => {
  this.alertService.error(error);
           
  });
}

}
