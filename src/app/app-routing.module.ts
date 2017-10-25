import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CampTableComponent } from './user/camp-table/camp-table.component';
import { FavoriteListComponent } from './user/favorite-list/favorite-list.component';
import { BookedListComponent } from './user/booked-list/booked-list.component';
import { CalendarComponent } from './user/calendar/calendar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/:id/camps', component: CampTableComponent },
  { path: 'user/:id/favorites', component: FavoriteListComponent },
  { path: 'user/:id/booked', component: BookedListComponent },
  { path: 'user/:id/calendar', component: CalendarComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
