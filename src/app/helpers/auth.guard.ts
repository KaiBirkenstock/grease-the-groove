import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        const loggedIn = !!user;

        if (!loggedIn) {
          this.router.navigate(['/registration']);
        }

        return loggedIn ? resolve(true) : reject(false);
      });
    });
  }
}

