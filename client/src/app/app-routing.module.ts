import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
    {path:'play', component: GameComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path:'', component: HomeComponent},
    { path: '**', component: HomeComponent }

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }