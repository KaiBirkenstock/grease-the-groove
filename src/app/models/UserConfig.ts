import { Map, List } from 'immutable';
import moment from 'moment';
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

    this.cycle = new WorkoutCycle(this.data.get('cycle'), timeFrame, this.currentMax);
  }

  get currentMax() {
    return this.data.get('currentMax');
  }

  set currentMax(value: number) {
    this.data = this.data.set('currentMax', value);
  }

  get date() {
    return this.data.get('date') === '' ? moment() : moment(this.data.get('date'));
  }

  set date(value: moment) {
    this.data = this.data.set('date', value);
  }

  get history() {
    return this.data.get('history') || List();
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