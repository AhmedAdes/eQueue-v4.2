import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FullPagesRoutingModule } from './full-pages-routing.module';

import { FullLayoutPageComponent } from './full-layout-page.component';

import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthenticationService, AuthGuard, UserService } from '../../services'

import { CompanyComponent } from '../company/company.component';
import { CompanyService } from 'app/services/comp.service';

const Services = [AuthenticationService, UserService, AuthGuard, CompanyService]
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
        CommonModule,
        FullPagesRoutingModule,
        Ng2SmartTableModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        // MaterialModule
    ],
    declarations: [
        FullLayoutPageComponent,
        DashboardComponent,
        UsersComponent,
        CompanyComponent
    ],
    providers: [
        ...Services
    ]
})
export class FullPagesModule { }
