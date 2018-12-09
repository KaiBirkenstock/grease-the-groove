import { Subject } from 'rxjs';
import { List } from 'immutable';
import { Day } from './Day';
import { WorkoutSet } from './WorkoutSet';

export class WorkoutDay extends Day {
    sets: List<WorkoutSet> = List();
    done: Subject<any> = new Subject();

    get isRestDay() {
        return this.data.isRestDay || false;
    }

    set isRestDay(value: boolean) {
        this.data.isRestDay = value;
    }

    get isDone() {
        return this.data.isDone || false;
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
