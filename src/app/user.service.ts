import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

const BASE_URL = 'https://rocky-crag-73141.herokuapp.com';
// const BASE_URL = 'http://localhost:8080';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  // getUsers() {
  //   return this.http.get(BASE_URL + '/user/')
  // }

  getBookedCampsByUser(id) {
    return this.http.get(BASE_URL + `/user/${id}/booked`)
  }

  getFavoriteCampsByUser(id) {
    return this.http.get(BASE_URL + `/user/${id}/favorites`)
  }

  addBookedCampByUser(id,body){
    return this.http.post(BASE_URL +`/user/${id}/booked`, body)
  }

  removeBookedCampsByUser(id,body){
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({
      headers: headers,
      body: body
    })
    return this.http.delete(BASE_URL + `/user/${id}/booked`, options)
  }

  addFavoriteCampByUser(id,body){
    return this.http.post(BASE_URL + `/user/${id}/favorites`, body)
  }

  removeFavoriteCampsByUser(id,body){
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({
      headers: headers,
      body: body
    })
    return this.http.delete(BASE_URL + `/user/${id}/favorites`, options)
  }

  parsedJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('-', '/');
    return JSON.parse(window.atob(base64));
  };

}
