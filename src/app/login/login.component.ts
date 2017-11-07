import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'KidCampGuide';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onSubmitLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const body = {
      email: email,
      password: password
    }
    this.authService.login(body)
    .subscribe(
      (response: Response) => {
        let data = response.json();
        localStorage.setItem('token', data.data)
        this.router.navigate(['/user'])
      (error) => {
        this.router.navigate(['/'])
        }
      }
    );
  }
}
