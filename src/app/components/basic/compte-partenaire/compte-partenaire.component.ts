import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first, filter ,map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { CompteService } from '../../../services/compte.service';
import { AlertService } from '../../../services/alert.service';
import { RoleService } from '../../../services/role.service';



@Component({
  selector: 'app-compte-partenaire',
  templateUrl: './compte-partenaire.component.html',
  styleUrls: ['./compte-partenaire.component.scss']
})
export class ComptePartenaireComponent implements OnInit {

  //Declaration des variables
compteForm: FormGroup;
error: string;
errorToken: string;
submitted = false;
x:boolean;
recup: string;
role;
iriPartenaire;
iri=`/api/roles/`;
iriRole=`/api/roles/4`;

ninea: string; rccm: string; tel: string; email: string; raisonSociale: string; adresse: string; capital: string;
username: string; password: string; confirmPassword: string; prenom: string; nom: string; emailUser: string;

constructor(
  private CompteService: CompteService, 
   private alertService: AlertService,
   private RoleService: RoleService,
   private route: Router,
  public dialogRef: MatDialogRef<ComptePartenaireComponent>) { }
ngOnInit() {


  this.x = false;
  
//recuperation des donnees du Compte Partenaire By son excellence WADE

  this.compteForm = new FormGroup({

  partenaire: new FormGroup({
  ninea: new FormControl('',Validators.required),
  rccm: new FormControl('', Validators.required),
  tel: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, 
  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
  raisonSociale: new FormControl('', Validators.required),
  adresse: new FormControl('', Validators.required),
  capital: new FormControl('', Validators.required),

  userPartenaire: new FormGroup({     
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    userRole: new FormControl('', Validators.required)
    })
    }),

  solde: new FormControl(0, Validators.required)

  });

//Appel de Function de chargement des infos Partenaire By Son Excellence WADE
  this.onChanges();
}

  onChanges(){
  this.compteForm.get('partenaire.ninea').valueChanges.subscribe(
    
  val => {
    if(val){
      this.dataPartenaireByNINEA(val);
    } 
    }
 );
}  
//recuperation des donnees du Partenaire par recherche de NINEA By Son Excellence WADE

dataPartenaireByNINEA(ninea){

  //recupereration du ninea saisie dans le formulaire By Son Excellence WADE;
  this.CompteService.searchByNINEA(ninea).subscribe(
    data => {
      //On test si la recherche par NINEA est vrai
       if(data["hydra:member"][0].partenaire)
       {
         let partner = data["hydra:member"][0].partenaire;
    
         this.iriPartenaire = partner['@id'];
    
         //console.log(this.iriPartenaire);
        
//Recuperer les elements du Partenaire BY Son Excellence WADE
  this.ninea = partner.ninea;
  this.rccm = partner.rccm;
  this.tel = partner.tel;
  this.email = partner.email;
  this.raisonSociale = partner.raisonSociale;
  this.adresse = partner.adresse;
  this.capital = partner.capital;
   
//Recuperer les elements de l'Utilisateur de partenaire BY Son Excellence WADE

let users = partner.userPartenaire[0];

this.username = users.username;
this.password = users.password;
this.confirmPassword = users.confirmPassword;
this.prenom = users.prenom;
this.nom = users.nom;
this.emailUser = users.email; 


//Desactivation des champs de saisies si les donnees du Partenaire existe BY Son Excellence WADE

//Data Partenaire BY Son Excellence WADE 
this.compteForm.get("partenaire.rccm").disable();
this.compteForm.get("partenaire.tel").disable();
this.compteForm.get("partenaire.email").disable();
this.compteForm.get("partenaire.raisonSociale").disable();
this.compteForm.get("partenaire.adresse").disable();
this.compteForm.get("partenaire.capital").disable();

//Data User Partenaire BY Son Excellence WADE 
this.compteForm.get("partenaire.userPartenaire").disable();

this.x = true; // Signifie que le Partenaire existe dans la base de donnees BY Son Excellence WADE

//Data UserPartenaire BY SOn Excellence WADE

this.compteForm.get("partenaire.userPartenaire").disable();

}else{
  //Si la recherche par NINEA est fausse, On initialise les champs de saisies BY Son Excellence WADE

  this.rccm = " "; this.tel =" "; this.email=" ";  this.raisonSociale=" "; this.capital=" "; this.adresse="";
  this.username=" "; this.password=" "; this.confirmPassword=" "; this.prenom=" "; this.nom=" "; this.emailUser=" ";

  //Activation des champs de saisies si les donnees du Partenaire n'existe BY Son Excellence WADE

  //Data Partenaire BY Son Excellence WADE 
this.compteForm.get("partenaire.rccm").enable();
this.compteForm.get("partenaire.tel").enable();
this.compteForm.get("partenaire.email").enable();
this.compteForm.get("partenaire.raisonSociale").enable();
this.compteForm.get("partenaire.adresse").enable();
this.compteForm.get("partenaire.capital").enable();

//Data User Partenaire BY Son Excellence WADE 
this.compteForm.get("partenaire.userPartenaire").enable();

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
       return this.route.navigateByUrl('');
     }else{
      //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
    alert(this.error); 
     }
   }
  )
}

//Function de control des champs de saisies BY Son Excellence WADE

get f() { return this.compteForm.controls; }


onSubmit() {
 this.submitted = true;

// réinitialiser les alertes lors de la soumission BY Son Excellence WADE
 this.alertService.clear();

 // s'arrête ici si le formulaire n'est pas valide BY Son Excellence WADE
 if(this.compteForm.invalid) {
     return;
 }

//Function de recuperation d'alerte service By Son Excellence WADE

this.CompteService.createComptePartenaire(this.compteForm.value)
   .subscribe(
   data=>{
     console.log(data);
   },
  error => {
  this.alertService.error(error);
           
  });
}

//Function d'ajout Compte Partenaire By son excellence WADE
onComptePartenaire()
{

//Si nouveau Partenaire BY Son Excellence WADE
  if (this.x ==false) {

    let partenaire = this.compteForm.value.partenaire;
    let newPartenaireCompte={
  
      solde: this.compteForm.value.solde,
      
      //Donnes du Nouveau Partenaire
      partenaire:{
       ninea: partenaire['ninea'],
       rccm:  partenaire['rccm'],
       raisonSociale: partenaire['raisonSociale'],
       adresse: partenaire['adresse'],
       capital:  partenaire['capital'],
       tel:  partenaire['tel'],
       email: partenaire['email'],
  
       //Donnee Utilisateur Partenaire
  
       userPartenaire:
       [ this.compteForm.value.partenaire['userPartenaire'] ]
       

      }
     };
  
     console.log(newPartenaireCompte);
     
      this.CompteService.createComptePartenaire(newPartenaireCompte)
      .subscribe(
        data => {
          console.log(data);
          if(data){
            alert("Compte Partenaire ajouté avec succées...");
            return this.route.navigateByUrl('/listCompte');
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
            return this.route.navigateByUrl('');
          }else{
           //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
         alert(this.error); 
          }
  
        }    
      )
 
  } //Si Partenaire existant BY Son Excellence WADE
  else{
 this.CompteService.createComptePartenaire(this.compteForm.value)
    .subscribe(
      data => {
        console.log(data);
        if(data){
          alert("Compte Partenaire ajouté avec succées...");
          return this.route.navigateByUrl('/listCompte');
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
          return this.route.navigateByUrl('');
        }else{
         //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
       alert(this.error); 
        }
      }    
    )
    
  
  }
 
  this.onClose(); //Appel de la Function de Fermeture de la Fenetre Modale BY Son Excellence WADE
}
  
//Function de Fermeture du Fenetre Modale BY Son Excellence WADE
onClose(){
  this.dialogRef.close();
}

  
}





