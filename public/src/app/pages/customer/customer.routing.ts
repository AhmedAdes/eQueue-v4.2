import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CustomerLayoutComponent, IssueTicketComponent, HistoryComponent, ActiveTicketComponent
} from './';
import { AuthGuard } from '../../services'

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: 'issue', component: IssueTicketComponent, data: { title: 'Issue new Ticket'}, canActivate: [AuthGuard] },
      { path: 'hstry', component: HistoryComponent, data: { title: 'Tickets History' }, canActivate: [AuthGuard] },
      { path: 'actv', component: ActiveTicketComponent, data: { title: 'Active Tickets' }, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

// export const routedComponents = [CustomerComponent];
