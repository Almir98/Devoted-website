import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../_services/communication.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  private translationSubscription : Subscription;
  private translations : any;
  constructor(private communicationService: CommunicationService, private translationService: TranslateService) 
  {
    this.translationSubscription = translationService.stream([
    'servicePage.consulting',
    'servicePage.solutions',
    'servicePage.automation',
    'servicePage.herald'
  ]).subscribe(x=>this.translations = x);
  }

  ngOnInit() {
  }

  contactForm(value: string): any{
    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
    this.communicationService.sendMessage(this.translations[value]);

    console.log(this.translations[value]);
  }
}
