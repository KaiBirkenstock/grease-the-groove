import { Component, OnInit } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { fromJS } from 'immutable';
import * as moment from 'dayjs';
import { AbstractPage } from '../abstracts/AbstractPage';
import { UserConfig } from '../models/UserConfig';
import { DatabaseService } from '../services/db/db.service';
import { TimeFrame } from '../models/TimeFrame';
import { WorkoutCycle } from '../models/WorkoutCycle';

export enum HomePagePhase {
  Setup = 'Setup',
  Testing = 'Testing',
  Workout = 'Workout',
  Finished = 'Finished'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends AbstractPage implements OnInit {
  userConfig: UserConfig;
  cycle: WorkoutCycle;

  state: any = {
    loaded: false,
    loading: true,
    phase: null
  };

  constructor(public alertCtrl: AlertController,
    public events: Events,
    private db: DatabaseService) {
    super();
  }

  async setState() {
    this.events.subscribe('home:setState', () => {
      this.fetch();
    });

    this.fetch();
  }

  async fetch() {
    const config = await this.db.loadConfig();
    this.userConfig = new UserConfig(fromJS(config), new TimeFrame(config.date));

    if (config.date !== '') {
      this.setCycle(this.userConfig.cycle);
    }

    this.state = {
      loaded: true,
      loading: false,
      phase: this.userConfig.date ? HomePagePhase.Workout : HomePagePhase.Setup
    };
  }

  setCycle(cycle: WorkoutCycle) {
    this.cycle = cycle;

    if (this.cycle.currentWorkoutDay) {
      this.cycle.currentWorkoutDay.done.subscribe((total: number) => {

        const workoutCycle = this.cycle;
        this.userConfig.updateCycle(workoutCycle);
        this.db.updateConfig(this.userConfig);
  
        this.state.phase = HomePagePhase.Finished;
      });
    }
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
    this.setCycle(this.userConfig.cycle);

    this.db.updateConfig(this.userConfig);
  }
}
