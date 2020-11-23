import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser: User;

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


}
