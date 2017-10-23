import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NgSemanticModule } from "ng-semantic";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { LogoutComponent } from './user/logout/logout.component';
import { UserComponent } from './user/user.component';
import { CampTableComponent } from './user/camp-table/camp-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    LogoutComponent,
    UserComponent,
    CampTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // NgSemanticModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
