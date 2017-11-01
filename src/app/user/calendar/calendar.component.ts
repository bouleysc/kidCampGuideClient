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
          setHours,
          differenceInHours,
          addHours  } from 'date-fns';
import { UserService } from 'app/user.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Response } from '@angular/http';
import 'angular-calendar/dist/css/angular-calendar.css';

const colors: any = {
  book: {
    primary: '#937bce',
    secondary: 'rgba(54, 111, 245, 0.4)'
  },
  fav: {
    primary: '#113cd8',
    secondary: 'rgb(9, 3, 99)'
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

  events: CalendarEvent[] = [
    {
      title: 'S.O.A.R. Program',
      color: colors.fav,
      start: new Date(),
      end: addDays(new Date(), 1),
    },
    {
      title: 'S.O.A.R. Program',
      color: colors.book,
      start: new Date(),
      end: addDays(new Date(), 1)
    }
  ];

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
          var startDate = new Date(camp.program_start_date)
          var endDate = new Date(camp.program_end_date)
          console.log(new Date(endDate.setHours(camp.program_end_time.split(':')[0])))
          this.events.push({
            start: new Date(startDate.setHours(camp.program_start_time.split(':')[0])),
            end: new Date(endDate.setHours(camp.program_end_time.split(':')[0])),
            allDay: camp.full_day,
            title: camp.program_name,
            color: colors.fav
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
            color: colors.book

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
