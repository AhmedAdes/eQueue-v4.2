import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ISubscription, Subscription } from 'rxjs/Subscription';

import * as hf from '../../helper.functions'
import { DepartmentService, AuthenticationService, TicketService } from 'app/services';
import { Ticket } from 'app/Models';

@Component({
  selector: 'app-main-queue',
  templateUrl: './main-queue.component.html',
  styleUrls: ['./main-queue.component.scss']
})
export class MainQueueComponent implements OnInit {
  currentUser = this.srvAuth.getUser()
  tickets: Observable<any>
  sTkts: any[] = [];
  all; hold; trans; vip;
  depts: any[] = [];
  sDept;
  sTk = new Ticket();
  private subscription = new Subscription();

  constructor(public db: AngularFireDatabase, private srvDept: DepartmentService,
    private srvAuth: AuthenticationService, private srvTkts: TicketService) {
  }

  ngOnInit() {
    this.srvDept.getUserDepts(this.currentUser.uID)
      .subscribe(res => {
        this.depts = res;
        if (this.depts.length > 0) {
          this.sDept = this.depts[0];
          this.observQueueList();
          this.initQueueList(this.depts[0].DeptID.toString())
        }
      });
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
  initQueueList(deptID) {
    this.tickets.subscribe(data => {
      this.all = data.filter(x => x['DeptID'] == deptID).length;
      this.hold = data.filter(x => x['DeptID'] == deptID && x['QStatus'] == 'Hold').length;
      this.trans = data.filter(x => x['DeptID'] == deptID && x['QStatus'] == 'Transferred').length;
      this.vip = data.filter(x => x['DeptID'] == deptID && x['UserID'] == '1').length;
    })
    this.changeList(0);
  }

  changeList(i: number) {
    switch (i) {

      case 0:
        this.tickets.subscribe(t => {
          this.sTkts = t.filter(x => x['DeptID'] == this.sDept.DeptID);
        })
        break;
      case 1:
        this.tickets.subscribe(t => {
          this.sTkts = t.filter(x => x['DeptID'] == this.sDept.DeptID && x.QStatus == 'Hold');
        })
        break;
      case 2:
        this.tickets.subscribe(t => {
          this.sTkts = t.filter(x => x['DeptID'] == this.sDept.DeptID && x.QStatus == 'Transferred');
        })
        break;
      case 3:
        this.tickets.subscribe(t => {
          this.sTkts = t.filter(x => x['DeptID'] == this.sDept.DeptID && x.UserID == '1');
        })
        break;
      default:
        break;
    }
  }

  nextQ() {
    if (this.all) {
      if (this.all > 0) {
        this.sTk = this.sTkts.find(x => x.QStatus == 'Waiting');
        this.sTk.QStatus = 'Current';
        this.sTk.ProvUserID = this.currentUser.uID;
        this.sTk.CallTime = this.srvTkts.GetToday().subscribe();

        this.srvTkts.updateTicket(this.sTk.QID, this.sTk)
          .subscribe(res => {
            console.log(res);
          });
      }
    }
  }
  onQSelect(ticket) {
    this.sTk = ticket;
    console.log(this.sTk);
  }
  onDeptSelect(dept) {
    this.sDept = dept;
    this.sTk = undefined;
    this.initQueueList(this.sDept.DeptID.toString());
  }
}
