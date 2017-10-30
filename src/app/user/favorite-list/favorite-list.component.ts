import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  favoriteCamps = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.onGetFavoriteCamps()
  }
  onGetFavoriteCamps() {
    const token = localStorage.getItem('token');
    const parsedToken = this.userService.parsedJWT(token);
    const id = parsedToken;
    this.userService.getFavoriteCampsByUser(id)
    .subscribe(
      (response: Response) => {
        let data = response.json()
        data.forEach(camp => {
          this.favoriteCamps.push(camp);
        })
      }
    )
  }
}
