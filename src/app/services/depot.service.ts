
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor( private http: HttpClient) { }

  //Function pour faire un Depot BY Son Excellence WADE

  faireDepot(depot){
    return this.http.post<any>(`${environment.apiUrl}/depots`, depot);
  }

  //Function pour afficher la liste des Depots BY Son Excellence WADE

  findAllDepot(){
    return this.http.get<any>(`${environment.apiUrl}/depots.json`);
  }
}
