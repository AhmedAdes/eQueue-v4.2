import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutPageComponent,
    data: {
      title: 'Full Layout Page'
    },
  }, 
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
