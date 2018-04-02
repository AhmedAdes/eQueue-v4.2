import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  currentLang = 'en';
  toggleClass = 'ft-maximize';
  constructor(public translate: TranslateService) {
    translate.setDefaultLang(this.currentLang)
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

}
