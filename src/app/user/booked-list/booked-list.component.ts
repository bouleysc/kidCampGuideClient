import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user.service';
import { Response } from '@angular/http';

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
    const id = this.userService.parsedJWT(this.token);
    this.userService.removeBookedCampsByUser(id, camp)
    .subscribe(
      (response: Response) => {
        response.json()
        for (var i=0; i<this.bookedCamps.length; i++) {
          if(camp.camp_id==this.bookedCamps[i].camp_id) {
            this.bookedCamps.splice(i, 1)
            i--
          }
        }
      }
    )
  }
}
