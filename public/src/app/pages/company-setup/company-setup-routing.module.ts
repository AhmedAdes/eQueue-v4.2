import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanySetupComponent } from "./company-setup.component";
import { CompanyComponent }  from './company/company.component';
import { DepartmentsComponent }      from './departments/departments.component';
import { BranchesComponent }   from './branches/branches.component';
import { ResultComponent }    from './result/result.component';
import { UserComponent } from 'app/pages/company-setup/users/users.component';

const routes: Routes = [
  {
    path: '',
     component: CompanySetupComponent,
    data: {
      title: 'CompanySetup'
    },
    children: [
      {
        path: 'companies',
        component: CompanyComponent,
        data: {
          title: 'Companies'
        }
      },
      {
        path: 'departments',
        component: DepartmentsComponent,        
        data: {
          title: 'Departments'
        }
      },  
      {
        path: 'branches',
        component: BranchesComponent,
        data: {
          title: 'Branches'
        }
      },
      {
        path:'users',
        component: UserComponent,
        data:{
          title: 'Users'
        }
      }
      ,  
      {
        path: 'conclusion',
        component: ResultComponent,
        data: {
          title: 'Conclusion'
        }
      }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySetupdRoutingModule { }

export const routedComponents = [CompanySetupComponent];
