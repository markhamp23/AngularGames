import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'  
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  canActivate(){
    if (this.authenticationService.getUsuariActual()) {
      return true;
    }else{
      this.router.navigate(['/games'])
      return false;
    }
  }
}
