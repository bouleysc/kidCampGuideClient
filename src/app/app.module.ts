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
    DataTableModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [AuthService, CampsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
