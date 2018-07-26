import { FlashMessagesService } from 'angular2-flash-messages';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashService {
  constructor(private flash: FlashMessagesService) {}

  success(msg: string, timeout = '4000') {
    this.show(msg, 'alert-success', timeout);
  }

  failure(msg: string, timeout = '4000') {
    this.show(msg, 'alert-danger', timeout);
  }

  show(msg: string, cssClass: string, timeout: string) {
    this.flash.grayOut(true);
    this.flash.show(msg, {
      cssClass: cssClass,
      timeout: timeout,
    });
  }
}
