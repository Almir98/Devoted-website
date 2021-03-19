import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { InViewportModule } from 'ng-in-viewport';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { FormsModule } from '@angular/forms';
import { LocationPageComponent } from './location-page/location-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ProductHeraldComponent } from './productHerald/productHerald.component';
import { ParticlesModule } from 'angular-particle';
import { CommunicationService } from './_services/communication.service';
 
@NgModule({
  declarations: [									
    AppComponent,
      HomePageComponent,
      ContactPageComponent,
      LocationPageComponent,
      FooterPageComponent,
      ServicesPageComponent,
      ProductHeraldComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  }),
  FormsModule,
  InViewportModule,
  ReactiveFormsModule,
  ParticlesModule
  ],
  providers: [CommunicationService,
    ],
  bootstrap: [AppComponent]
})

export class AppModule { 

}

  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }