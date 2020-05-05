import { DialogService } from './../../../services/dialog.service';
import { ComptePartenaireComponent } from './../compte-partenaire/compte-partenaire.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, MatPaginator, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { CompteService } from '../../../services/compte.service';

@Component({
  selector: 'app-list-comptepartenaire',
  templateUrl: './list-comptepartenaire.component.html',
  styleUrls: ['./list-comptepartenaire.component.scss']
})



export class ListComptepartenaireComponent implements OnInit {

error: string;
errorToken: string;

constructor( 
  private CompteService: CompteService, 
  private route: Router,
  private dialog: MatDialog,
  private dialogService: DialogService,
  public dialogRef: MatDialogRef<ListComptepartenaireComponent>
  ) { }

  listData: MatTableDataSource<any>
  
  displayedColumns: string[] = ['numCompte', 'solde', 'montantPlafond', 'dateCreation', 'partenaire', 'actions' ];
  
  searchKey: string;


  @ViewChild(MatSort,  {static: true}) sort: MatSort;

  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
 
   ngOnInit() {

    //On recupere tous les elements du Compte Partenaire BY Son Excellence WADE
    this.CompteService.findAllComptes().subscribe(
      data => {

      let listComptes = data;

      this.listData = new MatTableDataSource(listComptes);

      console.log(this.listData);

      this.listData.sort = this.sort;

      this.listData.paginator = this.paginator;

         },
       errormsgHttp => {

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
  );
  
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
  this.dialog.open(ComptePartenaireComponent, dialogConfig);
}

//Function  de Confirmation de suppression d'une ligne de Compte Partenaire BY Son Excellence WADE

onDelete($key){
  this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer ?').afterClosed().subscribe(

    res=> {
      console.log(res);
    }
  );
}

//Function de close de la boite de Confirmation Dialog BY Son Excellence WADE

closeDialog(){
  this.dialogRef.close(false);
}

}



