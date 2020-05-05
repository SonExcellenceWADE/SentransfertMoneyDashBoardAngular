import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationCompteService {

  constructor(private http: HttpClient) { }

  //function d'affectation de Compte Paretenaire By Son Excellence WADE

  affectCompte(affectationCompte){
    return this.http.post<any>(`${environment.apiUrl}/affectation_comptes`, affectationCompte)
  }

  //function de recuperation de la liste des Affectations de Compte pasrtenaire By Son Excellence WADE

  findAllAffectCompte(){
    return this.http.get<any>(`${environment.apiUrl}/affectation_comptes.json`)
  }
}
