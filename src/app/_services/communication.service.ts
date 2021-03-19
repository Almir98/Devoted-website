import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public content = new BehaviorSubject<string>('');
  public share = this.content.asObservable();

constructor() { }

sendMessage(message: string): any{
  this.content.next(message);
}
}
