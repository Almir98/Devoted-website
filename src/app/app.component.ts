import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewEncapsulation } from '@angular/core';
import { HostListener } from '@angular/core';
import { bih } from 'src/assets/i18n/bih';
import { de } from 'src/assets/i18n/de';
import { eng } from 'src/assets/i18n/eng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  scrolled: boolean = false;
  navopened: boolean = false;
  navclosed: boolean = false;
  public selectedLang: any = localStorage.getItem('language') ?? 'en';
  TransLang = ['en', 'bih', 'de'];

  constructor(private translationService: TranslateService) {

    if (localStorage.getItem('language') === null) {
      localStorage.setItem('language', 'en');
    }
    translationService.addLangs(['en', 'bih', 'de']);
    this.translate();
    this.selectedLang = localStorage.getItem('language');
  }

  setTranslateLanguage() {
    localStorage.setItem('language', this.selectedLang);
    this.translate();
  }

  translate() {
    if (this.selectedLang === 'bih') {
      this.translationService.setTranslation('bih', bih, true);
      this.translationService.use('bih');
    }
    else if (this.selectedLang === 'de') {
      this.translationService.setTranslation('de', de, true);
      this.translationService.use('de');
    }
    else {
      this.translationService.setTranslation('en', eng, true);
      this.translationService.use('en');
    }
  }

  scrollToSection(sectionName: string) {
    const el: any | null = document.getElementById(sectionName);
    this.scrolled = true;

    window.scrollTo({
      top: el.offsetTop - 60,
      behavior: 'smooth'
    });
    if (window.innerWidth < 767) {
      this.closeNav();
    }
  }

  homePage(): void {
    const el: any | null = document.getElementById('home');
    window.scrollTo({
      top: el.offsetTop - 60,
      behavior: 'smooth',
    });
  }

  homePageLogo(): void {
      const el: any | null = document.getElementById('home');
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: 'smooth',
      });
  }

  openNav() {
    document.body.style.overflowY = "hidden";
    this.navopened = true;
  }

  closeNav() {
    document.body.style.overflow = "auto";
    this.navclosed = true;
    this.navopened = false;
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    this.scrolled = document.documentElement.scrollTop != 0;
  }
}