import { Image } from './../models/image';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  //Function pour creer un Compte Utilisateur By Son Excellence WADE
  createUser(user){
    return this.http.post<User>(`${environment.apiUrl}/users`, user)
  }

 //Function pour recuperer la liste des Utilisateurs By Son Excellence WADE

 findAllUser(){
  return this.http.get<any>(`${environment.apiUrl}/users.json`)
}

//Function de Modification d'un Utilisateur By Son Excellence WADE

updateUser( user: User, id: number){
  return this.http.put<User>(`${environment.apiUrl}/users/${id}`,user)
}

//Function pour recuperer la liste d'un Utilisateur By Son Excellence WADE

findUserById(id: number){
  return this.http.get<User>(`${environment.apiUrl}/users/${id}.json`)
}

//Function de Suppression d'un Utilisateur By Son Excellence WADE

 deleteUser(id: number) {
  return this.http.delete(`${environment.apiUrl}/users/${id}`);
}

//function de blocage d'un utilisateur By Son Excellence WADE
blockedUser(id,status){ 
  return this.http.put<any>(`${environment.apiUrl}/users/${id}`,{ "isActive": status});
}

//function de telechargement du Profil Image BY Son Excellence WADE

upload(imageProfile, id){
  let headers = new HttpHeaders(
  {
      //'Content-Type': 'application/json',
      //'Accept': 'application/json',
  });

  return this.http.post<User>(`${environment.apiUrl}/users/imageprofile/${id}`, imageProfile);
}

getThumbnail(data){
  if(data.imageProfile ){
    var objectURL = 'data:image/jpeg;base64,' + data.imageProfile;
  }else{
    var objectURL ="./assets/images/image.png";

  }
//DomSanitizer aide à prévenir les bogues de sécurité de Cross Site Scripting (XSS) 
//en filtrant les valeurs pour une utilisation sûre dans les différents contextes DOM.
  return this.sanitizer.bypassSecurityTrustUrl(objectURL);


}

}

