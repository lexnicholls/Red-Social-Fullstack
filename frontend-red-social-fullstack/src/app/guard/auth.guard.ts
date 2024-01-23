import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, ɵɵinject } from '@angular/core';

export const authGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const authService =  ɵɵinject(AuthService);

  if (authService.loggedIn()) {
    return true; 
  } else {
    return inject(Router).createUrlTree(['/']);
  }
};
