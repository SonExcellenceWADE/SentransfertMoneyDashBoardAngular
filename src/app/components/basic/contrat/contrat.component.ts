import { FormGroup, FormControl } from '@angular/forms';
import { ContratService } from './../../../services/contrat.service';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {

  contrats: any;
  userPartner: any;
  error: string;
  contratForm: FormGroup;
  constructor(private contratService: ContratService, private router: Router) { }
  
  
  
  ngOnInit(): void {


    this.contratForm = new FormGroup(
      {contrat: new FormControl('')}
      );
      this.contratForm.value.contrat = "contrat";
    //Function de generation de Contrat BY SON EXCELLENCE WADE

    this.contratService.genereContrat(this.contratForm.value).subscribe( 
      data =>{
        console.log(data);
      },

       errormsgHttp => {
      //function de dump des donnes de l'entete API Backend By Son Excellence WADE
       console.log(errormsgHttp);

        //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
         this.error = errormsgHttp.error["hydra:description"];
        alert(this.error);
        
          return this.router.navigateByUrl('basic/listCompte');
     }
    
    );
    //Recuperation des donnees du contrat  BY SON EXCELLENCE WADE
    this.contratService.findlastContrat().subscribe(
     data => {
        if(data){
          this.contrats = data['hydra:member'];
          console.log(this.contrats);
          this.userPartner = data['hydra:member'][0].partenaire.userPartenaire;
          console.log(this.userPartner);
        }
       
     },

    // errormsgHttp => {
      //function de dump des donnes de l'entete API Backend By Son Excellence WADE
       // console.log(errormsgHttp);

        //recuperation des messages d'erreurs de l'API BacKend avec les codes Http By Son Excellence WADE
        // this.error = errormsgHttp.error["hydra:description"];
       // alert(this.error);
    // }
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

  /* onExportClick(){
    
    //Parameter to Configuration file generation pdf by Son Excellence WADE
    const options = {
      filename: 'contrat_de_partenariat.pdf',
      image: { type: 'jpeg'}, //png, webp,
      html2pdfcanvas: {},
      jsPDF: {orientation: 'landscape'}
    };
    const content: Element = document.getElementById('element-to-export');

    html2pdf()
     .from(content)
     .set(options)
     .save();
  } */

}
