import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  curUser = this.auth.getUser()
  custData = [{ head: 'Current Active Tickets', count: 3 }, { head: 'Total Tickets in Last 30 Days', count: 26 },
  { head: 'Monthly Visit Rate', count: 6 }]

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    if (this.curUser) {
      if (this.curUser.etyp = 0) { //sysAdmin

      } else if (this.curUser.etyp = 1) { //Provider
        switch (this.curUser.uRl) {
          case 1: //CompADMIN
            break;
          case 2: //SuperUser
            break;
          case 3: //User
            break;
          default:
            break;
        }
      } else if (this.curUser.etyp = 2) { //Customer
        switch (this.curUser.uRl) {
          case 1: //CompADMIN
            break;
          case 2: //SuperUser
            break;
          case 3: //User
            break;
          default:
            break;
        }
      }
    }
  }

}
