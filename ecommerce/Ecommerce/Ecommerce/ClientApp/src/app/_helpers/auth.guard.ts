import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userSerice: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            let x: number;
            this.userSerice.GetUser().subscribe(u => x = u[0].roleId);
            // logged in so return true
            setTimeout(() => {
                if (x === 0) {
                    return true;
                }
                return false;
            }, 1);

        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
    }
}
