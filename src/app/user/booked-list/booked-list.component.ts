import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user.service';
import { Response } from '@angular/http';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.css']
})
export class BookedListComponent implements OnInit {
  bookedCamps = [];
  token
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.onGetBookedCamps()
  }

  onGetBookedCamps() {
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken;
    this.userService.getBookedCampsByUser(id)
    .subscribe(
      (response: Response) => {
        let data = response.json()
        data.forEach(camp => {
          this.bookedCamps.push(camp);
        })
      }
    )
  }

  onRemoveBookedCampByUser(camp){
    console.log(camp)
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken.id
    this.userService.removeBookedCampsByUser(id, camp.camp_id)
    .subscribe(
      (response: Response) => {
        response.json()
      }
    )
  }
}
