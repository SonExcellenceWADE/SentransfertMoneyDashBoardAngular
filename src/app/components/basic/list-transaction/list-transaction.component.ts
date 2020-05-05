import { DialogService } from './../../../services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent implements OnInit {
 error: string;
 errorToken: string;
  constructor(
    private TransactionService: TransactionService,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<ListTransactionComponent>
  ) { }

  listData: MatTableDataSource<any>

  displayedColumns: string[] = [
    'prenomEnvoyeur', 'nomEnvoyeur', 'telEnvoyeur', 'montantEnvoi','fraisEnvoi', 'totalEnvoi', 'codeEnvoi', 'dateEnvoi', 'compteEnvoi',  
    'prenomBeneficiaire', 'nomBeneficiaire', 'telBeneficiaire', 'cinBeneficiaire', 'dateRetrait', 'compteRetrait', 'status'
  ];

  searchKey: string;

  @ViewChild(MatSort,  {static: true}) sort: MatSort;

  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;

  ngOnInit() {

    //On recupere la liste des Transaction BY Son Excellence WADE
    this.TransactionService.findAllTransaction().subscribe(
      data => {

      let listTransactions = data;

      this.listData = new MatTableDataSource(listTransactions);

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
    return this.router.navigateByUrl('');
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
  this.dialog.open(TransactionComponent, dialogConfig);
}

  

}
