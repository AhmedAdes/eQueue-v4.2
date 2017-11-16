import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from '../login/login-page.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
