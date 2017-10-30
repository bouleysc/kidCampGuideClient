import {  Component,
          ChangeDetectionStrategy,
          ViewEncapsulation} from '@angular/core';
import {  CalendarEvent,
          CalendarMonthViewDay,
          CalendarEventAction,
          CalendarEventTimesChangedEvent } from 'angular-calendar';
          import {
            startOfDay,
            endOfDay,
            subDays,
            addDays,
            endOfMonth,
            isSameDay,
            isSameMonth,
            addHours
          } from 'date-fns';
import { UserService } from 'app/user.service';
import { Response } from '@angular/http';
import 'angular-calendar/dist/css/angular-calendar.css';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  viewDate: Date = new Date();
  view: string = 'month';
  selectedDay: CalendarMonthViewDay;
  token
  // events$: Observable<Array<CalendarEvent<{ this.addingBookedEvents() }>>>;

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.addingBookedEvents()
  }
  addingBookedEvents() {
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken;
    this.userService.getBookedCampsByUser(id)
    .subscribe(
      (response: Response) => {
        console.log(response.json())
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
