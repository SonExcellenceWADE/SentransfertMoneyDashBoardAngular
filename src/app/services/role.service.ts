import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  
constructor(private http: HttpClient) { }

// Function de recuperation des roles de l'API Backend By Son Excellence WADE
  findAllRoles(){
    return  this.http.get<any>(`${environment.apiUrl}/roles.json`);
 }
}
