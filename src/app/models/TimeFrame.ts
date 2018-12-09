import * as moment from 'dayjs';
import { List } from 'immutable';

import { WorkoutDay } from './WorkoutDay';

export class TimeFrame {
  startDate: any;
  endDate: any;

  constructor(startDate: any, private timeEntity: moment.UnitType = 'month') {
    this.startDate = moment(startDate === '' ? new Date() : startDate);
    this.init();
  }

  init() {
    this.endDate = moment(this.startDate).add(1, this.timeEntity);
    this.buildDayList();
  }

  buildDayList() {
    const countDays = this.endDate.endOf('day').diff(this.startDate.startOf('day'), 'days') + 1;

    let days = List();

    for (let i = 0; i < countDays; i++) {
      const dateMoment = moment(this.startDate).add(i, 'day');

      const date = new WorkoutDay({
        date: dateMoment.toJSON(),
        i18n: dateMoment.format('dddd')
      });
      days = days.push(date);
    }

    return days;
  }
}