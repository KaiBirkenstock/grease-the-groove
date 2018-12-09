import { OnInit } from '@angular/core';
import moment from 'moment';
import { environment } from '../../environments/environment';

export class AbstractPage implements OnInit {

  ngOnInit() {
    if (!environment.production) {
      window['moment'] = moment;

      window[this.constructor.name] = this;
      console.log(this);
    }

    this.setState();
  }

  setState() {

  }
}