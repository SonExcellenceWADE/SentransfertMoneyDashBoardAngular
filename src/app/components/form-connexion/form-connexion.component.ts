import { AuthentificationService } from '../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrls: ['./form-connexion.component.css']
})
export class FormConnexionComponent implements OnInit {
formConnexion: FormGroup;
loading = false;
submitted = false;
returnUrl: string;
error: string;

  constructor(
private auth: AuthentificationService,
private formBuilder: FormBuilder,
private route: ActivatedRoute,
private router: Router,
private alertService: AlertService

   ){ }

  ngOnInit() {

    //function de control de la Validation des champs de saisies de la connexion
    this.formConnexion = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // getter pratique pour un accès facile aux champs de formulaire
  get f() { return this.formConnexion.controls; }

//function de validation du formulaire By Son Excellence WADE
  onSubmit() {
    this.submitted = true;

   // réinitialiser les alertes lors de la soumission
    this.alertService.clear();

    // s'arrête ici si le formulaire n'est pas valide
    if (this.formConnexion.invalid) {
        return;
    }
  

  this.loading = true;
  this.auth.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}
  onConnexion(){
    console.log(this.formConnexion.value);
    let user = {
      username: this.formConnexion.value.username,
      password: this.formConnexion.value.password
    };
    this.auth.login(user.username, user.password).subscribe(
      data=>{
        console.log(data);
        this.router.navigateByUrl("/dashboard");
      },
    errormsgHttp=>{
      //function de dump des donnes de l'entete API Backend By Son Excellence WADE
        console.log(errormsgHttp);

        //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
         this.error = errormsgHttp.error.message;

         //verifier si le msg est invalid credentialpour personnaliser le msg d'alerte by Son Excellence WADE
       if (this.error == "Invalid credentials.") {
         alert("login ou mot de passe incorrect !!!"); 
       }else{

        //Afficher les autre msg d'erreurs du backends
         alert(this.error); 
       }
        
      }
    )
  }


}


