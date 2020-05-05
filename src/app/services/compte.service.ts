import { Compte } from './../models/compte';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http: HttpClient) { }

  //function de creation de Compte Partenaire By Son Excellence WADE
  createComptePartenaire(compte){
    return this.http.post<any>(`${environment.apiUrl}/comptes`, compte)
  }


  //function de recherche par Ninea du Partenaire By Son excellence WADE

  searchByNINEA(ninea){
    return this.http.get<any>(`${environment.apiUrl}/comptes?partenaire.ninea=${ninea}`, ninea)
  }


  //function de recherche par Numero de Compte Partenaire BY Son Excellence  WADE

  searchByNumCompte(numCompte){
    return this.http.get<any>(`${environment.apiUrl}/comptes?numCompte=${numCompte}`,numCompte)
  }


  //function pour lister les elements du Compte Partenaire BY Son Excellence WADE

  findAllComptes(){
    return this.http.get<any>(`${environment.apiUrl}/comptes.json`);
  }

  //function pour lister un element du Compte Partenaire BY SOn Excellence WADE

  findCompteById(id: number){
    return this.http.get<Compte>(`${environment.apiUrl}/comptes/${id}.json`)
  }

  //Function de Suppression d'un Compte Partenaire BY Son Excellence WADE

  deleteComptePartenaire(id){

    return this.http.delete<any>(`${environment.apiUrl}/comptes/${id}`);
  }

}


