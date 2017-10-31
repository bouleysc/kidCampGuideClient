import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
  constructor(private http: Http, private router: Router){}
  signup(body: any) {
    return this.http.post('https://rocky-crag-73141.herokuapp.com/signup', body)
  }
  login(body: any) {
    return this.http.post('https://rocky-crag-73141.herokuapp.com/login', body)
  }
}
