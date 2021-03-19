import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-productHerald',
  templateUrl: './productHerald.component.html',
  styleUrls: ['./productHerald.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductHeraldComponent implements OnInit {

  constructor() { }
  ngOnInit() { }

  openConfiguration(){
    window.open("https://devoted-common-cdn.azureedge.net/herald-public/P0_Herald_Dashboard_Configuration_manual_V1.5.pdf",'_blank');
  }

  appManual(){
    window.open("https://devoted-common-cdn.azureedge.net/herald-public/P0_Herald_Andriod_App_User_Manual_V1.0.pdf",'_blank');
  }
  
  pricingFunction(){
    window.open("https://devoted-common-cdn.azureedge.net/herald-public/P4_ENG_Pricing_and_Payment_Policy_V1.4.pdf",'_blank');
  }

  heraldServices(){
    window.open("https://heraldservices.net/",'_blank');
  }

}
