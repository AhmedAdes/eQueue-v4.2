import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { UsersComponent } from '../users/users.component';
import { CustomerLayoutComponent } from '../customer'
import { CompanyComponent } from 'app/pages/company-setup/company/company.component';
import { DepartmentsComponent } from 'app/pages/company-setup/departments/departments.component';
import { BranchesComponent } from 'app/pages/company-setup/branches/branches.component';
import { UserComponent } from 'app/pages/company-setup/users/users.component';


const routes: Routes = [
  {
    path: '', component: FullLayoutPageComponent, data: { title: 'Full Layout Page' }, canActivate: [AuthGuard]
  },
  {
    path: 'users', component: UsersComponent, data: { title: 'Users' }, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: UsersComponent, canActivate: [AuthGuard]
  }
  ,
  { path: 'customer', loadChildren: '../customer/customer.module#CustomerModule' },
  {
    path: 'companies', component: CompanyComponent, canActivate: [AuthGuard]    
  },
  {
    path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard]    
  }
  ,
  {
    path: 'branches', component: BranchesComponent, canActivate: [AuthGuard]    
  }
  ,
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
