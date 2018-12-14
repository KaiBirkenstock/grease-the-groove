import {Component} from '@angular/core';
import * as moment from 'dayjs';
import {fromJS, List} from 'immutable';
import {AbstractPage} from '../abstracts/AbstractPage';
import {TimeFrame} from '../models/TimeFrame';
import {UserConfig} from '../models/UserConfig';
import {WorkoutDay} from '../models/WorkoutDay';
import {DatabaseService} from '../services/db/db.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page extends AbstractPage {
  userConfig: UserConfig;
  historyItems: List<WorkoutDay>;

  constructor(private db: DatabaseService) {
    super();
  }

  async setState() {
    const config = await this.db.loadConfig();
    this.userConfig = new UserConfig(fromJS(config), new TimeFrame(config.date));

    this.historyItems = this.userConfig.cycle.workoutDays.filter(x => x.isDone || x.date.startOf('day').isBefore(moment().startOf('day'))).toList();
  }
}
