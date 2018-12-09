import { Map, List } from 'immutable';
import * as moment from 'dayjs';
import { TimeFrame } from './TimeFrame';
import { Day } from './Day';
import { WorkoutCycle } from './WorkoutCycle';

export enum FighterProgramm {
  RM3 = '3RM',
  RM5 = '5RM',
  RM15 = '15RM',
  RM25 = '25RM'
}

export class UserConfig {
  data: Map<string, any>;
  cycle: WorkoutCycle;

  constructor(data: Map<string, any>, public timeFrame?: TimeFrame) {
    this.data = data;

    if (this.data.get('date') !== '') {
      this.buildCycle();
    }
  }

  get currentMax() {
    return this.data.get('currentMax');
  }

  set currentMax(value: number) {
    this.data = this.data.set('currentMax', value);
  }

  get date() {
    return !this.data.get('date') || this.data.get('date') === '' ? null : moment(this.data.get('date'));
  }

  set date(value: any) {
    this.data = this.data.set('date', value);

    this.buildCycle();
  }

  get history() {
    return this.data.get('history') || List();
  }

  buildCycle() {
    this.cycle = new WorkoutCycle(this.data.get('cycle'), new TimeFrame(this.date), this.currentMax);
  }

  updateCycle(cycle: WorkoutCycle) {
    cycle.data = cycle.data.update('days', days => {
      return days.map(day => {
        day.data.sets = day.sets.map(set => {
          return set.data;
        });
        return day.data;
      });
    });
    this.data = this.data.set('cycle', cycle.data);
  }

  addCycleToHistory() {
    if (this.cycle.isCompleted) {
      this.data = this.data.update('history', history => history.push(this.cycle.data));
    }
  }

  addToMax(value: number) {
    this.currentMax = this.currentMax + value;
  }
}