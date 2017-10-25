import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CampsService } from './camps.service'
import { LogoutComponent } from './user/logout/logout.component';
import { UserComponent } from './user/user.component';
import { CampTableComponent } from './user/camp-table/camp-table.component';
import { DataTableModule } from 'angular-4-data-table/src/index';
import { HeaderComponent } from './header/header.component';
import { FavoriteListComponent } from './user/favorite-list/favorite-list.component';
import { BookedListComponent } from './user/booked-list/booked-list.component';
import { CalendarComponent } from './user/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    LogoutComponent,
    UserComponent,
    CampTableComponent,
    HeaderComponent,
    FavoriteListComponent,
    BookedListComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [AuthService, CampsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
