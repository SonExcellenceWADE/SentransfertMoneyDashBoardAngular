import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';



//Le service d'alerte permet à n'importe quel composant de l'application d'afficher des messages d'alerte en haut de la page via le composant d'alerte.
//Il a des méthodes pour afficher les messages d'erreur et de succès, et a d'une méthode getMessage() qui renvoie un Observable utilisé par le composant d'alerte pour s'abonner aux notifications chaque fois qu'un message doit être affiché.

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {

       // efface les messages d'alerte sur le changement de route sauf si l'indicateur 'keepAfterRouteChange' est vrai
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {

              //ne conserve que pour un seul changement d'itinéraire
                    this.keepAfterRouteChange = false;
                } else {
                    //effacer le message d'alerte
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
    }

    clear() {
       //efface en appelant subject.next () sans paramètres
        this.subject.next();
    }
}