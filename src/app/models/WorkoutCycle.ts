import { Map, fromJS } from 'immutable';
import { TimeFrame } from './TimeFrame';
import { Day } from './Day';
import { WorkoutDay } from './WorkoutDay';
import { WorkoutSet } from './WorkoutSet';

export class WorkoutCycle {
    data: Map<string, any>;

    constructor(data: Map<string, any>, timeFrame: TimeFrame, currentMax: number) {
        if (!data) {
            const emptyCycle = Map({
                days: timeFrame.buildDayList(),
                currentMax: currentMax
            });
            data = emptyCycle;
            this.data = data;
            this.buildCycle();
        } else {
            data = data.update('days', days => days.map(day => new WorkoutDay(day)));
            this.data = data;
        }
    }

    get isCompleted() {
        return false;
    }

    get workoutDays() {
        return this.data.get('days');
    }

    get currentWorkoutDay() {
        return this.workoutDays.find((wd: WorkoutDay) => !wd.isDone);
    }

    buildCycle() {
        let value = this.data.get('currentMax');

        this.data = this.data.update('days', days => {
            return days.map((day: WorkoutDay, index: any, iter: any) => {
                if (index >= 5 && index % 5 === 0) {
                    day.isRestDay = true;
                } else if (index === 0 || index % 6 === 0) {
                    day.sets = this.buildSets([
                        value,
                        value - 1,
                        value - 2,
                        value - 3,
                        value - 4
                    ]);
                } else if (index === 1 || index % 7 === 0) {
                    day.sets = this.buildSets([
                        value,
                        value - 1,
                        value - 2,
                        value - 3,
                        value - 3
                    ]);
                } else if (index === 2 || index % 8 === 0) {
                    day.sets = this.buildSets([
                        value,
                        value - 1,
                        value - 2,
                        value - 2,
                        value - 3
                    ]);
                } else if (index === 3 || index % 9 === 0) {
                    day.sets = this.buildSets([
                        value,
                        value - 1,
                        value - 1,
                        value - 2,
                        value - 3
                    ]);
                } else if (index === 4 || index % 10 === 0) {
                    day.sets = this.buildSets([
                        value,
                        value,
                        value - 1,
                        value - 2,
                        value - 3
                    ]);
                    value++;
                }

                return day;
            });
        });
    }

    buildSets(list: number[]) {
        return fromJS(list.map(num => new WorkoutSet({ reps: num })));
    }
}
