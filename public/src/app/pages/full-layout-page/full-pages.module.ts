import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table'

import { FullPagesRoutingModule } from './full-pages-routing.module';

import { FullLayoutPageComponent } from './full-layout-page.component';

import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IssueTicketComponent, HistoryComponent, ActiveTicketComponent } from '../customer';

import { AuthenticationService, UserService } from '../../services'

const Services = [AuthenticationService, UserService]

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        Ng2SmartTableModule
    ],
    declarations: [
        FullLayoutPageComponent,
        DashboardComponent,
        UsersComponent,
        IssueTicketComponent,
        HistoryComponent,
        ActiveTicketComponent,
    ],
    providers: [
        ...Services
    ]
})
export class FullPagesModule { }
