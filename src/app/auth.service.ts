import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Router } from '@angular/router';

const BASE_URL = 'https://rocky-crag-73141.herokuapp.com';
// const BASE_URL = 'http://localhost:8080';

@Injectable()

export class AuthService {
  constructor(private http: Http, private router: Router){}
  signup(body: any) {
    return this.http.post(BASE_URL + '/signup', body)
  }
  login(body: any) {
    return this.http.post(BASE_URL + '/login', body)
  }
}
