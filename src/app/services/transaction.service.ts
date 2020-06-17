import { Transaction } from './../models/transaction';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }


    //function de Transaction cas Depot Partenaire BY Son Excellence WADE

    depotTransaction(transaction: Transaction){
      return this.http.post<any>(`${environment.apiUrl}/transactions`, transaction)
    }

    //function de recherche ligne transaction par codeEnvoi BY Son Excellence WADE

    searchByCodeEnvoi(codeEnvoi){
      return this.http.get<any>(`${environment.apiUrl}/transactions?codeEnvoi=${codeEnvoi}`, codeEnvoi)
    }

    //function de Transaction cas Retrait Partenaire BY Son Excellence WADE
    
    retraitTransaction(transaction, id){
      return this.http.put<any>(`${environment.apiUrl}/transactions/retrait/${id}`, transaction)
    }

  //function de la liste des transactions BY Son Excellence WADE

  findAllTransaction(){
    return this.http.get<any>(`${environment.apiUrl}/transactions.json`);
  }

  //function affichage Last ligne de tansaction BY Son Excellence WADE

  findLastTransaction(){
    return this.http.get<any>(`${environment.apiUrl}/transactions/list`);
  }
}
