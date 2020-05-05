import { DialogService } from './../../../services/dialog.service';
import { ListComptepartenaireComponent } from './../list-comptepartenaire/list-comptepartenaire.component';
import { ListUserComponent } from './../list-user/list-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { DepotComponent } from '../depot/depot.component';
import { Router } from '@angular/router';
import { DepotService } from '../../../services/depot.service';

@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.component.html',
  styleUrls: ['./list-depot.component.scss']
})
export class ListDepotComponent implements OnInit {

  error: string;
  errorToken: string;



  constructor( 
    private depotService: DepotService, 
    private dialog: MatDialog,
    private dialogService: DialogService,
    private route: Router
    ) { }
  
    listData: MatTableDataSource<any>
    
    displayedColumns: string[] = ['compte', 'dateDepot', 'montantDepot'];
    
    searchKey: string;
  
  
    @ViewChild(MatSort,  {static: true}) sort: MatSort;
  
    @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
   
     ngOnInit() {
  
      //On recupere tous les elements de la liste de Depots  BY Son Excellence WADE
      this.depotService.findAllDepot().subscribe(
        data => {
         let listDepot = data;
         //console.log(listComptes);
          this.listData = new MatTableDataSource(listDepot);
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
  
  //Function de filtrage des donnees du Depot BY Son Excellence WADE
    applyFilter(filterValue: string) {
      this.listData.filter = filterValue.trim().toLowerCase();
  
    
  }
  //Function de l'appel de la creation de Depot BY Son Excellence WADE
  onCreate(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "70%";
    this.dialog.open(DepotComponent, dialogConfig);
  }

  //Function d'appel liste des comptes  BY Son Excellence WADE

  onListCompte(){ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "70%";
    this.dialog.open(ListComptepartenaireComponent, dialogConfig);
  }

  //Function  d'appel liste des utilisateurs BY Son Excellence WADE

  onListUser(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "70%";
    this.dialog.open(ListUserComponent, dialogConfig);
  }
  
  //Function  de Confirmation de suppression d'une ligne de Depots BY Son Excellence WADE
  
  onDelete($key){
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer ?').afterClosed().subscribe(
  
      res=> {
        console.log(res);
      }
    );
  }
  
  }