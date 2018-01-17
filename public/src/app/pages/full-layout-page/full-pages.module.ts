import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';

import { FullPagesRoutingModule } from './full-pages-routing.module';

import { FullLayoutPageComponent } from './full-layout-page.component';

import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthenticationService, AuthGuard, UserService, DepartmentService, BranchService, DeptServsService } from '../../services'

import { CompanyService } from 'app/services/comp.service';
import { CompanySetupModule } from 'app/pages/company-setup/company-setup.module';



const Services = [AuthenticationService, UserService, AuthGuard,
     CompanyService,DepartmentService,BranchService,DeptServsService]

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        Ng2SmartTableModule,
        FormsModule,
        ReactiveFormsModule,
        CompanySetupModule        
        // MaterialModule,
      
    ],
    declarations: [
        FullLayoutPageComponent,
        DashboardComponent,
        UsersComponent
    ],
    providers: [
        ...Services
    ]
    
})
export class FullPagesModule { }
