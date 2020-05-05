import { User } from '../../../models/user';
import { DialogService } from '../../../services/dialog.service';
import { UserService } from '../../../services/user.service';
import { CreateuserComponent } from '../createuser/createuser.component';
import { map, filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users;
  query;
  isActive: boolean=true;
  error: string;
  errorToken: string;
  //@Input() a=2;
  
  constructor( 
    private UserService: UserService,
    private route: Router,
    private dialog: MatDialog,
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<ListUserComponent>
    ) { }

    listData: MatTableDataSource<any>
  
  displayedColumns: string[] = ['username', 'prenom', 'nom', 'email', 'roles' , 'status', 'actions'];
  
  searchKey: string;


  @ViewChild(MatSort,  {static: true}) sort: MatSort;

  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
 

  ngOnInit() {


  //On recupere tous les Utilisateurs de la classe User

  //let username = localStorage.getItem("username");

  this.UserService.findAllUser()
  .subscribe(
    data => {
      this.users = data;
      console.log(this.users);
      this.listData = new MatTableDataSource(this.users);
      console.log(this.listData);
 
      this.listData.sort = this.sort;

      this.listData.paginator = this.paginator;
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


  //Function pour effacer les saisies de la bare de recherche BY Son Excellence WADE

  onSearchClear(){
    this.searchKey = "";
    //this.applyFilter(); //Call a function to Filter BY Son Excellence WADE
}

//Function de filtrage des donnees du Compte Partenaire BY Son Excellence WADE
applyFilter(filterValue: string) {
  this.listData.filter = filterValue.trim().toLowerCase();


}
//Function de l'appel de la creation de compte partenaire BY Son Excellence WADE
onCreate(){

const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width = "80%";
dialogConfig.height = "70%";
this.dialog.open(CreateuserComponent, dialogConfig);
}

//Function de close de la boite de Confirmation Dialog BY Son Excellence WADE

closeDialog(){
  this.dialogRef.close(false);
}

   //function permet de recupperer l'image à partir d'un Utilisateur

   getImage(user: User){
     return this.UserService.getThumbnail(user);
   }

   //Function de changement de Status si l'utilisateur est actif ou bloque by Son Excellence WADE
   changeStatus(id, status){
     this.UserService.blockedUser(id, status)
     .subscribe(
       data => {
         console.log(data);
       }
     )
   }
  

}
