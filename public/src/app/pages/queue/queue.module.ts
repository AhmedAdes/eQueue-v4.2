import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {QueueLayoutComponent , MainQueueComponent , QueueHistoryComponent , QueueScheduleComponent
} from './'
import {QueueRoutingModule} from './queue.routing';
import { ActiveQueueComponent } from './active-queue/active-queue.component';
import { HoldQueueComponent } from './hold-queue/hold-queue.component';
import { TransferredQueueComponent } from './transferred-queue/transferred-queue.component';
import { VipQueueComponent } from './vip-queue/vip-queue.component';
import { AllQueueComponent } from './all-queue/all-queue.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {
  CompanyService, BranchService, DepartmentService, DeptServsService, TicketService
} from '../../services'

const firebaseConfig = {
  apiKey: "AIzaSyBEzZp-q-FDr6NipFRU3IHAJ0X0Ul9zNHY",
  authDomain: "equeueing-5acb7.firebaseapp.com",
  databaseURL: "https://equeueing-5acb7.firebaseio.com",
  projectId: "equeueing-5acb7",
  storageBucket: "equeueing-5acb7.appspot.com",
  messagingSenderId: "904716700018"
};

@NgModule({
  imports: [
    QueueRoutingModule,CommonModule,NgbModule,
    FormsModule,ReactiveFormsModule,HttpModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports:[],
  declarations: [QueueLayoutComponent,MainQueueComponent, QueueHistoryComponent, QueueScheduleComponent, ActiveQueueComponent, HoldQueueComponent, TransferredQueueComponent, VipQueueComponent, AllQueueComponent],
  providers: [CompanyService, BranchService, DepartmentService, DeptServsService, TicketService],  
})
export class QueueModule { }
