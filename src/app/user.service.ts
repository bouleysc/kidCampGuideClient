import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getUsers() {
    return this.http.get('http://localhost:8080/user/')
  }

  getBookedCampsByUser(id) {
    return this.http.get(`http://localhost:8080/user/${id}/booked`)
  }

  getFavoriteCampsByUser(id) {
    return this.http.get(`http://localhost:8080/user/${id}/favorites`)
  }

  addBookedCampByUser(id,body){
    return this.http.post(`http://localhost:8080/user/${id}/booked`, body)
  }

  removeBookedCampsByUser(id,body){
    return this.http.delete(`http://localhost:8080/user/${id}/booked`, body)
  }

  addFavoriteCampByUser(id,body){
    return this.http.post(`http://localhost:8080/user/${id}/favorites`, body)
  }


  parsedJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('-', '/');
    return JSON.parse(window.atob(base64));
  };

}
