import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {fromJS} from 'immutable';
import moment from 'moment';
import {AbstractPage} from '../abstracts/AbstractPage';
import {UserConfig} from '../models/UserConfig';
import {DatabaseService} from '../services/db/db.service';
import { TimeFrame } from '../models/TimeFrame';

export enum HomePagePhase {
  Setup = 'Setup',
  Testing = 'Testing',
  Workout = 'Workout'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends AbstractPage implements OnInit {
  userConfig: UserConfig;

  state: any = {
    loaded: false,
    loading: true,
    phase: null
  };

  constructor(public alertCtrl: AlertController,
              private db: DatabaseService) {
    super();
  }

  async setState() {
    const config = await this.db.loadConfig();
    this.userConfig = new UserConfig(fromJS(config), new TimeFrame(config.date));

    this.state = {
      loaded: true,
      loading: false,
      phase: HomePagePhase.Setup
    };
  }

  startTest() {
    this.state.phase = HomePagePhase.Testing;
  }

  async openMaxInputAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enter the value',
      inputs: [{
        name: 'currentMax',
        type: 'number',
        value: 99
      }],
      buttons: [{
        text: 'Ok',
        handler: (value: { currentMax: number }) => {
          this.userConfig.currentMax = value.currentMax;
        }
      }
        , 'Cancel'
      ]
    });

    await alert.present();
  }

  doneTesting() {
    this.state.phase = HomePagePhase.Workout;
    this.userConfig.date = moment().toJSON();
    this.db.updateConfig(this.userConfig);
  }
}
