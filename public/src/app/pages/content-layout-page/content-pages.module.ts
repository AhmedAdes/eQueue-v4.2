import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from '../login/login-page.component';
import { AuthenticationService } from '../../services'



@NgModule({
    imports: [
        CommonModule, HttpModule, RouterModule,
        FormsModule,
        ContentPagesRoutingModule
    ],
    declarations: [
        LoginPageComponent,
        ContentLayoutPageComponent
    ],
    providers: [AuthenticationService]
})
export class ContentPagesModule { }
