import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  constructor(public auth: AuthenticationService, public router: Router) { }
  DoLogout() {
    this.auth.logout()
    this.router.navigate(['/out/login'])
  }
}
