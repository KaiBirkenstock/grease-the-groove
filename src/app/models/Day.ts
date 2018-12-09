import * as moment from 'dayjs';
export const dayMapping = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class Day {
  data: any;

  constructor(data) {
    this.data = data;
  }

  get date() {
    return moment(this.data.date);
  }

  get day() {
    return this.date.format('dddd');
  }

  get month() {
    return this.date.format('MMMM');
  }

  get year() {
    return this.date.format('YYYY');
  }

  get dayOfWeek() {
    return this.date.day();
  }

  get translation() {
    return this.data.i18n;
  }

  get enum() {
    return dayMapping[this.dayOfWeek];
  }
}
