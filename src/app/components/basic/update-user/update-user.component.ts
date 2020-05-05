import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {map, first} from 'rxjs/operators'
import { formatDate } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { AlertService } from '../../../services/alert.service';




@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class UpdateUserComponent implements OnInit {
  id : number;
  user;
  role;
  isActive:boolean=true;
  thumbail;
  imageForm: FormGroup;
  updateGroup: FormGroup;
  error: string;
  errorToken: string;
  iri=`/api/roles/`;
  submitted = false;
  
  constructor( 
    private UserService:UserService, 
    private roles: RoleService, 
    private alertService: AlertService, 
    private route: ActivatedRoute, 
    private router: Router,
    private FormBuilder: FormBuilder) { }

  ngOnInit() {

    //Au chargement de la Je recuppere les roles
   this.role =this.roles.findAllRoles().pipe(map((array) => array.filter(role => role.nameRole != "SUP_ADMIN"))).subscribe(
    data=>{
      console.log(data);
      this.role=data;
    }
  );

   this.imageForm = this.FormBuilder.group({
     image:[]
   });

    this.updateGroup = this.FormBuilder.group({
    username: new FormControl('', Validators.required),
    prenom: new FormControl('',Validators.required),
    nom: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, 
                              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    userRole: new FormControl('',Validators.required), 
    });
   //nous obtiendrons les paramètres de route à l'aide de la méthode snapshot.param.
   // La méthode d'instantané est accessible à l'aide du service ActivatedRoute dans Angular.
   //Le service ActivatedRoute vous aide à surveiller l'itinéraire actuellement activé associé au composant actuellement lancé.
   
   this.id = this.route.snapshot.params.id; //recuperation de l'id de l'utilisateur via l'url de la route
  
    this.UserService.findUserById(this.id)
    .subscribe(
      data=>{
        //console.log(data);
        this.user = data;
        console.log(this.user);
        this.thumbail = this.UserService.getThumbnail(data)

      }
    )
    
  }

  //chargement de l'image par evenement By Son Excellence WADE
  upload($event){
    console.log($event.target.files.lenght);
    if($event.target.files.lenght>0){
      let selectedFile = $event.target.Files[0];
      const uploadData = new FormData();
   
      uploadData.append('imageProfile', selectedFile, selectedFile.name);
   
       this.UserService.upload(uploadData, this.id)
       .subscribe(
         data => {
           console.log(data);
           
         },
         errormsgHttp=>{
            //function de dump des donnes de l'entete API Backend By Son Excellence WADE
          console.log(errormsgHttp);
  
          //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
           this.error = errormsgHttp.error["hydra:description"];
  
          //Afficher le message d'erreur avec la function Alerte BY Son Excellence WADE
           alert(this.error); 
            
           this.UserService.findUserById(this.id).subscribe(
             data=>{
               this.thumbail = this.UserService.getThumbnail(data);
             }
           )
         }  
       )
    }
  }


//Function de control des champs de saisies
get f() { return this.updateGroup.controls; }

onSubmit() {
  this.submitted = true;

 // réinitialiser les alertes lors de la soumission
  this.alertService.clear();

  // s'arrête ici si le formulaire n'est pas valide
  if (this.updateGroup.invalid) {
      return;
  }


this.UserService.updateUser(this.updateGroup.value, this.id)
    .pipe(first())
    .subscribe(
    data=>{
      console.log(data);
    },
       error => {
            this.alertService.error(error);
            
        });
}

  //Function de modification d'un utilisateur By Son Excellence WADE

  updateUser(){

//On Change la valeur de id role en iri c-a-d ∕api∕roles/{id}

this.updateGroup.value.userRole=`${this.iri}${this.f.userRole.value}`;

    console.log(this.updateGroup.value);

    this.UserService.updateUser(this.updateGroup.value, this.id).subscribe(
      data =>{
        console.log(data)
        if(data){
          alert('Utilisateur modifié avec succées...');
          
          return this.router.navigateByUrl("/listUser");
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
    )
  }

}
