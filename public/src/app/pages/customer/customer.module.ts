import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  CustomerLayoutComponent, IssueTicketComponent, HistoryComponent, ActiveTicketComponent
} from './';
import { CustomerRoutingModule } from './customer.routing'
import {
  CompanyService, BranchService, DepartmentService, DeptServsService, TicketService
} from '../../services'

@NgModule({
  imports: [CustomerRoutingModule, CommonModule,
    FormsModule, ReactiveFormsModule, HttpModule,
    RouterModule, NgbModule 
  ],
  exports: [],
  declarations: [CustomerLayoutComponent, IssueTicketComponent, HistoryComponent, ActiveTicketComponent],
  providers: [CompanyService, BranchService, DepartmentService, DeptServsService, TicketService],
})
export class CustomerModule { }
