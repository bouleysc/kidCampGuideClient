import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'KidCampGuide';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  OnSubmitSignup(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }
    this.authService.signup(body)
    .subscribe(
      (response: Response) => {
        let data = response.json();
        localStorage.setItem('token', data.data);
        this.router.navigate(['/user'])
      (error) => {
        this.router.navigate(['/'])
        }
      }
    );
  }
}
