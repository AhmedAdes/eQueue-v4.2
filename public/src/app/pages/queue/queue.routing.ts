import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueueLayoutComponent , MainQueueComponent , QueueHistoryComponent , QueueScheduleComponent
} from './'
import { AuthGuard } from '../../services'

const routes: Routes = [
  {
    path: '',
    component: QueueLayoutComponent,
    children: [
      { path: 'mqueue', component: MainQueueComponent, data: { title: 'Main Queue'}, canActivate: [AuthGuard] },
      { path: 'hstry', component: QueueHistoryComponent, data: { title: 'Queue History' }, canActivate: [AuthGuard] },
      { path: 'schd', component: QueueScheduleComponent, data: { title: 'Queue Schedule' }, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueRoutingModule {}

// export const routedComponents = [CustomerComponent];
