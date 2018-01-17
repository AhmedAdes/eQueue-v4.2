import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from '../login/login-page.component';
import { AuthenticationService, AuthGuard, DepartmentService, BranchService, DeptServsService } from '../../services'

import { FullPagesModule } from 'app/pages/full-layout-page/full-pages.module';
import { CompanySetupModule } from 'app/pages/company-setup/company-setup.module';



@NgModule({
    imports: [
        CommonModule, HttpModule, RouterModule,
        FormsModule,
        ContentPagesRoutingModule,
        FullPagesModule,
        CompanySetupModule
    ],
    declarations: [
        LoginPageComponent,
        ContentLayoutPageComponent
    ],
    providers: [AuthenticationService,AuthGuard,DepartmentService,BranchService,DeptServsService]
})
export class ContentPagesModule { }
