import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from '../login/login-page.component';

import { AuthGuard } from 'app/services';
import { MainDisplayComponent } from 'app/pages/queue';


const routes: Routes = [
  {
    path: '',
    component: ContentLayoutPageComponent,
    data: {
      title: 'Content Layout page'
    },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'mdisplay',
    component: MainDisplayComponent,
    data: {
      title: 'Login Page'
    }
  },
  { path:'companySetup',loadChildren: '../company-setup/company-setup.module#CompanySetupModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
