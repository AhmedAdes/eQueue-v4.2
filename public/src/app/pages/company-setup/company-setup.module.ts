import { NgModule } from '@angular/core';

import { CompanySetupdRoutingModule } from "./company-setup-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* App Root */
import { CompanySetupComponent } from './company-setup.component';
import { NavbarComponent } from './navbar/navbar.component';

/* Feature Components */
import { CompanyComponent } from './company/company.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ServiceComponent } from './service/service.component';
import { BranchesComponent } from './branches/branches.component';
import { UserComponent } from './users/users.component';
import { ResultComponent } from './result/result.component';

/* Shared Service */
import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';
import { CommonModule } from "@angular/common";
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompanySetupdRoutingModule,
        SharedModule
    ],
    exports: [CompanySetupComponent,CompanyComponent,DepartmentsComponent,BranchesComponent,UserComponent]
    ,
    providers: [{ provide: FormDataService, useClass: FormDataService },
    { provide: WorkflowService, useClass: WorkflowService }],
    declarations: [CompanySetupComponent, NavbarComponent, CompanyComponent, DepartmentsComponent
        , BranchesComponent, ResultComponent, ServiceComponent, UserComponent],
    bootstrap: [CompanySetupComponent]

})

export class CompanySetupModule { }