import {  Component,
          ChangeDetectionStrategy,
          ViewEncapsulation} from '@angular/core';
import {  CalendarEvent,
          CalendarMonthViewDay } from 'angular-calendar';
import {  startOfDay,
          endOfDay,
          subDays,
          addDays,
          endOfMonth,
          isSameDay,
          isSameMonth,
          addHours  } from 'date-fns';
import { UserService } from 'app/user.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Response } from '@angular/http';
import 'angular-calendar/dist/css/angular-calendar.css';

const colors: any = {
  purple: {
    primary: '#6e31d8',
    secondary: '#380e82'
  },
  blue: {
    primary: '#113cd8',
    secondary: 'rgba(54, 111, 245, 0.6)'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  viewDate: Date = new Date();
  view: string = 'month';
  selectedDay: CalendarMonthViewDay;
  token
  // events$: Observable<Array<CalendarEvent<{ this.addingBookedEvents() }>>>;

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.addingBookedCamps()
    this.addingFavoritedCamps()
  }

  addingFavoritedCamps() {
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken;
    this.userService.getFavoriteCampsByUser(id)
    .subscribe(
      (response: Response) => {
        let data = response.json()
        data.forEach(camp => {
          this.events.push({
            start: new Date(camp.program_start_date),
            end: new Date(camp.program_end_date),
            title: camp.program_name,
            color: colors.blue
          })
        })
      })
    }

  addingBookedCamps() {
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken;
    this.userService.getBookedCampsByUser(id)
    .subscribe(
      (response: Response) => {
        let data = response.json()
        data.forEach(camp => {
          this.events.push({
            start: new Date(camp.program_start_date),
            end: new Date(camp.program_end_date),
            title: camp.program_name,
            color: colors.purple
          })
        })
      })
    }

  dayClicked(day: CalendarMonthViewDay): void {
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    day.cssClass = 'cal-day-selected';
    this.selectedDay = day;
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (
        this.selectedDay &&
        day.date.getTime() === this.selectedDay.date.getTime()
      ) {
        day.cssClass = 'cal-day-selected';
        this.selectedDay = day;
      }
    });
  }
}
