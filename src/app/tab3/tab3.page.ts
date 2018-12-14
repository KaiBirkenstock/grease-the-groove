import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, Events} from '@ionic/angular';
import * as firebase from 'firebase';
import {AbstractPage} from '../abstracts/AbstractPage';
import {DatabaseService} from '../services/db/db.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends AbstractPage {
  userProfile: any;

  constructor(public db: DatabaseService,
              public alertCtrl: AlertController,
              public router: Router,
              public events: Events) {
    super();
  }

  setState() {
    firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.userProfile = user;
        } else {
          this.userProfile = null;
        }
      });
  }

  async logout() {
    await firebase.auth().signOut();

    await this.router.navigateByUrl('/registration', { replaceUrl: true });
  }

  async clearData() {
    const confirm = await this.alertCtrl.create({
      header: 'Warning',
      subHeader: 'Clear all data and reset the app?',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            await this.db.clearUserData();

            await this.router.navigateByUrl('/tabs/(home:home)');

            this.events.publish('home:setState');
          }
        }
      ]
    });

    await confirm.present();
  }
}
