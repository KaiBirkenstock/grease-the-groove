import { Component } from '@angular/core';
import { DatabaseService } from '../services/db/db.service';
import { Router } from '@angular/router';
import { AbstractPage } from '../abstracts/AbstractPage';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends AbstractPage {
  constructor(public db: DatabaseService, public router: Router, public events: Events) {
    super();
  }

  async clearData() {
    await this.db.clearUserData();

    await this.router.navigateByUrl('/tabs/(home:home)');

    this.events.publish('home:setState');
  }
}
