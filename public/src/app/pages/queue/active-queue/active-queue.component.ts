import { Component, OnInit, Input } from '@angular/core';
import { TicketService, AuthenticationService } from 'app/services';
import { Ticket } from 'app/Models';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'active-queue',
  templateUrl: './active-queue.component.html',
  styleUrls: ['./active-queue.component.scss']
})
export class ActiveQueueComponent implements OnInit {
  @Input() tId: number = 0;
  @Input() startTimer = false;
  sTicket = new Ticket();
  totalServices: number = 0;
  bColour = '#FFACB5';
  fColour = 'White';
  min; hr; sec;
  holdEvent = false;
  showTrans = false;
  holdEvents = [];
  constructor(private srvTicket: TicketService, private srvAuth: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.tId > 0) {
      this.srvTicket.getSelectedTicket(this.tId)
        .subscribe(data => {
          if (data[0].length > 0) {
            this.sTicket = data[0][0];
            this.sTicket.Services = data[1];
            this.totalServices = 0;
            this.showTrans =false;
            for (var i = 0; i < this.sTicket.Services.length; i++) {
              this.totalServices += this.sTicket.Services[i].ServCount;
            }
            this.backColor();
          }
          if (this.sTicket.ServingTime > 0) { // Setting the Serving Time Value after Converting Seconds into Sec/Min/Hr
            this.min = Math.floor(this.sTicket.ServingTime / 60);
            this.hr = Math.floor(this.min / 60);
            this.sec = this.sTicket.ServingTime - this.min * 60;
          }
          if (this.sTicket.ServingTime != null && this.sTicket.ServingTime > 0) { //Checking if Ticket Was On Hold or Not to show related Events 
            var startDate = new Date(this.sTicket.StartServeDT);
            var endtDate = new Date(this.sTicket.EndServeDT);
            let servTime = Math.abs(endtDate.getSeconds() - startDate.getSeconds());
            if (servTime != this.sTicket.ServingTime)
              this.holdEvent = true;
            else
              this.holdEvent = false;
          } else {
            this.holdEvent = false;
          }
        })
    }
    else {
      this.sTicket = new Ticket();
      this.bColour = '#FFACB5';
      this.fColour = 'white';
    }
  }

  backColor() {
    switch (this.sTicket.QStatus) {
      case 'Waiting':
        this.bColour = '#FF4758';
        this.fColour = 'white';
        break;
      case 'Served':
        this.bColour = '#81C784';
        this.fColour = 'white';
        break;
      case 'Current':
        if (this.sTicket.ProvUserID == this.srvAuth.getUser().uID) {
          this.bColour = '#FFD600';
          this.fColour = 'black';
        }
        else {
          this.bColour = '#FF7043';
          this.fColour = 'black';
        }
        break;
      case 'Pending':
        this.bColour = '#01579B';
        this.fColour = 'white';
        break;
      case 'Hold':
        this.bColour = '#4DB6AC';
        this.fColour = 'white';
        break;
      case 'NotAttended':
        this.bColour = 'rgb(156, 189, 187)';
        this.fColour = 'black';
        break;
      default:
        this.bColour = '#FFACB5';
        this.fColour = 'white';
        break;
    }
  }
  showT() {
    this.showTrans = !this.showTrans;
  }
  openH(content) {
    this.srvTicket.getHoldEvents(this.sTicket.QID)
      .subscribe(res => {
        this.holdEvents = res;
        this.modalService.open(content);
      })
  }
  openT(content){
    this.modalService.open(content);
  }
}
