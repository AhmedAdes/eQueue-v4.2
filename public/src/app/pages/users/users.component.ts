import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../Models'
import { UserService } from '../../services'

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
      class: 'table table-responsive'
    }
  };

  constructor(private srvUsr: UserService) { }

  ngOnInit() {
    this.srvUsr.getuser().subscribe(cols => this.data = new LocalDataSource(cols))
  }

}
