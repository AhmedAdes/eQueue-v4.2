import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../Models'
import { UserService } from '../../services'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as hf from '../helper.functions'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data: LocalDataSource;

  settings = {
    columns: {
      UserID: {
        title: 'ID',
      },
      UserName: {
        title: 'Full Name',
      },
      LoginName: {
        title: 'LoginName',
      },
      UserRole: {
        title: 'UserRole',
      },
      EntityType: {
        title: 'EntityType',
      },
      Phone: {
        title: 'Phone',
      },
      Mobile: {
        title: 'Mobile',
      },
      Email: {
        title: 'Email',
      },
      Disabled: {
        title: 'Disabled',
      },
    },
    attr: {
      class: 'table table-hover'
    }
  };

  tickets: Observable<any>
  
  constructor(private srvUsr: UserService, public db: AngularFireDatabase) {

    this.tickets = db.list('MainQueue',
      ref => ref.orderByChild('DeptID').equalTo('4')
    ).valueChanges().map(tkts => {
      return tkts.filter((tkt) => {
        if (tkt['VisitDate'] == hf.handleDate(new Date())) {
          return true;
        } else {
          return false;
        }
      })
    })
  }

  ngOnInit() {
    this.srvUsr.getuser().subscribe(cols => this.data = new LocalDataSource(cols))
    this.tickets.subscribe(k => console.log(k))
  }

}
