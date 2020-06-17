import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
@Component({
  selector: 'app-recu-transaction',
  templateUrl: './recu-transaction.component.html',
  styleUrls: ['./recu-transaction.component.scss']
})
export class RecuTransactionComponent implements OnInit {
  error: string;
  transactions: any;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {

    //Recuperation to last ligne de Transaction By Son Excellence WADE

    this.transactionService.findLastTransaction().subscribe(

      data => {
         this.transactions = data['hydra:member'];
         console.log(this.transactions);
      },

      errormsgHttp => {
        //function de dump des donnes de l'entete API Backend By Son Excellence WADE
         console.log(errormsgHttp);
  
          //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
           this.error = errormsgHttp.error["hydra:description"];
          alert(this.error);

      }
    );
  }

public convetToPDF()
{
var data = document.getElementById('element-to-export');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('contrat_de_partenariat.pdf'); // Generated PDF
});
}

}




