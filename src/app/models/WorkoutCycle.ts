import { Map } from 'immutable';
import { TimeFrame } from './TimeFrame';

export class WorkoutCycle {
    data: Map<string, any>;

    constructor(data: Map<string, any>, timeFrame: TimeFrame, currentMax: number) {
        if (!data) {
            const emptyCycle = Map({
                days: timeFrame.buildDayList()
            });
            data = emptyCycle;
        }
        this.data = data;
    }

    get isCompleted() {
        return false;
    }
}