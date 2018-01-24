import { Component, OnInit, Input } from '@angular/core';
import { TicketService, AuthenticationService } from 'app/services';
import { Ticket } from 'app/Models';

@Component({
  selector: 'active-queue',
  templateUrl: './active-queue.component.html',
  styleUrls: ['./active-queue.component.scss']
})
export class ActiveQueueComponent implements OnInit {
  @Input() tId: number = 0;
  sTicket = new Ticket();
  currUser = this.srvAuth.getUser();
  constructor(private srvTicket: TicketService, private srvAuth: AuthenticationService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.tId > 0) {
      this.srvTicket.getSelectedTicket(this.tId)
        .subscribe(data => {
          if (data[0].length > 0) {
            this.sTicket = data[0][0];
            this.sTicket.Services = data[1];
          }
        })
    }
  }


}
