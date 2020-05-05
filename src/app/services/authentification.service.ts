import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
private currentUsersubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUsersubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
   }

   //function getter de l'utilisateur courant connecte by Son Excellence WADE
   
   public get currentUserValue() : User {
     return this.currentUsersubject.value;
   }
    
  //function de Connexion avec Angular 8 by Son Excellence
  login(username, password){

    //dumper la route de connexion du backend Api by Son Excellence WADE
    console.log(environment.loginUrl);
    return this.http.post<User>(`${environment.loginUrl}/login_check`, {username, password}).
    pipe(map(user=>{

      // stocke les détails de l'utilisateur et le jeton jwt dans le stockage local pour garder l'utilisateur connecté entre les actualisations de page
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUsersubject.next(user);
      return user;
    }));
  }

  // Function de recuperation des roles de l'API Backend 
  getRoles(){
     return this.http.get<Role>(`${environment.apiUrl}/roles`);
  }

  
//function de Deconnexion avec Angular 8 by Son Excellence WADE
  logout() {
    
    // supprime l'utilisateur du stockage local et définit l'utilisateur actuel sur null
    localStorage.removeItem('currentUser');
    this.currentUsersubject.next(null);
}

}


