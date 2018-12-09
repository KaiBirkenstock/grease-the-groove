import moment from 'moment';
import { List } from 'immutable';
import { Day } from './Day';

export class TimeFrame {
  startDate: any;
  endDate: any;

  constructor(startDate: any, private timeEntity: string = 'month') {
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
      const dateMoment = moment(this.startDate).add(i, 'days');

      const date = new Day({
        date: dateMoment,
        i18n: dateMoment.format('dddd')
      });
      days = days.push(date);
    }

    return days;
  }
}