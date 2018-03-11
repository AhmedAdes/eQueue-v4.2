import { Component, OnInit, animate } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ISubscription, Subscription } from 'rxjs/Subscription';

import * as hf from '../../helper.functions'
import { DepartmentService, AuthenticationService, TicketService } from 'app/services';
import { Ticket, CurrentUser } from 'app/Models';
import swal from 'sweetalert2';

@Component({
  selector: 'main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss']
})
export class MainDisplayComponent implements OnInit {

  tickets: Observable<any>
  currentUser = this.srvAuth.getUser()
  departments = [];
  constructor(public db: AngularFireDatabase, private srvAuth: AuthenticationService, private srvDept: DepartmentService) {
  }

  ngOnInit() {
    this.srvDept.getBranchDepts(this.currentUser.bID)
      .subscribe(res => {
        this.departments = res;
        console.log(this.departments)
      })

    this.observQueueList();

    this.tickets.subscribe(data => {
      for (let i = 0; i < this.departments.length; i++) {      
        this.departments[i].tickets = data.filter(x => x.QStatus == 'Current' && x.DeptID == this.departments[i].DeptID);
      }      
    })
  }

  observQueueList() {
    this.tickets = this.db.list('MainQueue',
      ref => ref.orderByChild('BranchID').equalTo(this.currentUser.bID.toString())
    ).valueChanges().map(tks => {
      return tks.filter((tkt) => {
        if (tkt['VisitDate'] == hf.handleDate(new Date())) {
          return true;
        } else {
          return false;
        }
      })
    })
  }

}
