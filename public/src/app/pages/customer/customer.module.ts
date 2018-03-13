import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {
  CustomerLayoutComponent, IssueTicketComponent, HistoryComponent, ActiveTicketComponent
} from './';
import { CustomerRoutingModule } from './customer.routing'
import {
  CompanyService, BranchService, DepartmentService, DeptServsService, TicketService
} from '../../services'

const firebaseConfig = {
  apiKey: "AIzaSyBEzZp-q-FDr6NipFRU3IHAJ0X0Ul9zNHY",
  authDomain: "equeueing-5acb7.firebaseapp.com",
  databaseURL: "https://equeueing-5acb7.firebaseio.com",
  projectId: "equeueing-5acb7",
  storageBucket: "equeueing-5acb7.appspot.com",
  messagingSenderId: "904716700018"
};

@NgModule({
  imports: [CustomerRoutingModule, CommonModule,
    FormsModule, ReactiveFormsModule, HttpModule,
    RouterModule, NgbModule ,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [],
  declarations: [CustomerLayoutComponent, IssueTicketComponent, HistoryComponent, ActiveTicketComponent],
  providers: [CompanyService, BranchService, DepartmentService, DeptServsService, TicketService],
})
export class CustomerModule { }
