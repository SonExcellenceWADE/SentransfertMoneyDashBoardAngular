import { environment } from './../../environments/environment';
import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  //Function de Generation de Contrat BY Son Excellence WADE

  genereContrat(contrat){
    return this.http.post<any>(`${environment.apiUrl}/contrats`, contrat)
  }
  
 //Function pour afficher la ligne de Contrat BY Son Excellence WADE

  findlastContrat(){
    return this.http.get<any>(`${environment.apiUrl}/contrats/list`);
  }
}
