import { Component, OnInit } from '@angular/core';
import { TicketService, AuthenticationService } from '../../../services'
import { CurrentUser, Ticket } from '../../../Models'
import * as hf from '../../helper.functions'

@Component({
  selector: 'app-active-ticket',
  templateUrl: './active-ticket.component.html',
  styleUrls: ['./active-ticket.component.scss']
})
export class ActiveTicketComponent implements OnInit {
  currentUser = this.auth.getUser()
  tickets: Ticket[]
  constructor(private srvTkt: TicketService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.srvTkt.getActiveTickets(this.currentUser.uID).subscribe(cols => {
      this.tickets = cols;
      if (this.tickets) {
        this.tickets.forEach(t => t['visTimeChngd'] = hf.changeToServerTime(t.VisitTime))
      }
    }, err => hf.handleError(err))
  }
  CancelTicket(tkt: Ticket) {
    this.srvTkt.CancelTicket(tkt.QID).subscribe(ret => {
      if (ret.error) { hf.handleError(ret.error) }
      if (ret.affected > 0) {
        this.ngOnInit()
      }
    }, err => hf.handleError(err))
  }
}
