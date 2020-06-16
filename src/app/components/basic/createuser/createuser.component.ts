import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, filter ,map} from 'rxjs/operators';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateuserComponent implements OnInit {

 //Declaration des variables
 registerForm: FormGroup;
 role;
 iri=`/api/roles/`;
error: string;
errorToken: string;
submitted = false;

 constructor(
  private roles:RoleService,
  private route:Router,
  private UserService:UserService,
  private formBuilder: FormBuilder, 
  private alertService: AlertService,
  public dialogRef:MatDialogRef<CreateuserComponent>) { }

 ngOnInit() {
   //Au chargement  Je recuppere les roles du backend en faisnat un filtrage sur le Role de l' Admin System
   this.role =this.roles.findAllRoles().subscribe(
     data=>{
       console.log(data);
       this.role=data;
     }
   );  
//recuperation des donnees de l'utilisateur sur un formGroup By son excellence WADE
   this.registerForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(5)]),
    prenom: new FormControl('',Validators.required),
    nom: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, 
                              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    userRole: new FormControl('',Validators.required), 
   /*  image: new FormControl('',Validators.required),
    partenaire: new FormControl('',Validators.required) */ 

  });
 }

 //Function de control des champs de saisies
 get f() { return this.registerForm.controls; }


 onSubmit() {
  this.submitted = true;

 // réinitialiser les alertes lors de la soumission
  this.alertService.clear();

  // s'arrête ici si le formulaire n'est pas valide
  if (this.registerForm.invalid) {
      return;
  }

//Function de recuperation d'alerte SMS By Son Excellence WADE

this.UserService.createUser(this.registerForm.value)
    .pipe(first())
    .subscribe(
    data=>{
      console.log(data);
    },
       error => {
            this.alertService.error(error);
            
      });
}

//Function d'ajout utilisateur By son excellence WADE

 onRegister()
 {
   //On Change la valeur de id role en iri c-a-d ∕api∕roles/{id}
   console.log(this.registerForm.value);
   this.registerForm.value.userRole=`${this.iri}${this.f.userRole.value}`;
   console.log(this.registerForm.value.userRole);

   //Je creer le nouveau utilisateur
     this.UserService.createUser(this.registerForm.value)
     .subscribe(
       data=>{
         console.log(data);
         if(data){
           alert("Utilisateur ajouté avec succées...");
           return this.route.navigateByUrl('/basic/listUser');
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
     this.onClose(); //Appel de la Function de Fermeture de la Fenetre Modale BY Son Excellence WADE
    }
      
    //Function de Fermeture du Fenetre Modale BY Son Excellence WADE
    onClose(){
      this.dialogRef.close();
    }
}