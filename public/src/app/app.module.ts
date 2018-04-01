
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

// import { ChangeLogComponent } from './changelog/changelog.component';
// import { FullLayoutPageComponent } from './pages/full-layout-page/full-layout-page.component';
// import { ContentLayoutPageComponent } from './pages/content-layout-page/content-layout-page.component';

import * as $ from 'jquery';
import { MaterialModule } from 'app/material.module';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
              }
        }),
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
