import {fromJS, List} from 'immutable';
import {Subject} from 'rxjs';
import {Day} from './Day';
import {WorkoutSet} from './WorkoutSet';

export class WorkoutDay extends Day {
  sets: List<WorkoutSet>;
  done: Subject<any> = new Subject();

  constructor(data: any) {
    super(data.toJS ? data.toJS() : data);

    this.sets = this.data.sets ? fromJS(this.data.sets).map(set => new WorkoutSet(set)) : List();
  }

  get isRestDay() {
    return this.data.isRestDay || false;
  }

  set isRestDay(value: boolean) {
    this.data.isRestDay = value;
  }

  get isDone() {
    return this.sets.size > 0 && !this.sets.find((set: WorkoutSet) => !set.isDone);
  }

  set isDone(value: boolean) {
    this.data.isDone = value;
  }

  get currentSet() {
    return this.sets.find((set: WorkoutSet) => !set.isDone);
  }

  get setsAsText() {
    return this.sets.map(set => set.reps).join('/');
  }

  finishSet() {
    this.currentSet.done();

    if (!this.currentSet) {
      const totalCount = this.sets.map((set: WorkoutSet) => set.reps).reduce((sum: number = 0, reps: number) => sum + reps);

      this.done.next(totalCount);
    }
  }
}
