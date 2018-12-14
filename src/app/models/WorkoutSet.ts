import * as moment from 'dayjs';
import {Map, fromJS} from 'immutable';

export interface WorkoutSetI {
  reps: number;
  done?: boolean;
  time?: null | any;
}

export class WorkoutSet {
  data: Map<string, any>;

  constructor(data: WorkoutSetI) {
    this.data = fromJS(data);
  }

  get reps() {
    return this.data.get('reps');
  }

  set reps(value: number) {
    this.data = this.data.set('reps', value);
  }

  get isDone() {
    return this.data.get('done') || false;
  }

  get time() {
    return this.data.get('time') ? moment(this.data.get('time')) : null;
  }

  done() {
    this.data = this.data.set('done', true).set('time', moment().toJSON());
  }
}
