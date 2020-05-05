import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

//L'intercepteur JWT intercepte les demandes http de l'application pour ajouter un jeton d'authentification JWT à l'en-tête Authorization si l'utilisateur est connecté.
//Les intercepteurs HTTP sont ajoutés au pipeline de demandes dans la section fournisseurs (providers) du fichier app.module.ts.

@Injectable({
  providedIn: 'root'
})
export class  JwtInterceptorService implements HttpInterceptor {

  constructor(private authentificationService : AuthentificationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    // ajouter un en-tête d'autorisation avec le jeton jwt si disponible
    let currentUser = this.authentificationService.currentUserValue;
 
    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    return next.handle(request);
}
}
