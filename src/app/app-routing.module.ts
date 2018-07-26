import { AuctionComponent } from './components/auction/auction.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { AuthGuard } from './guards/auth.guard';
import { PollsComponent } from './components/polls/polls.component';
import { PollComponent } from './components/poll/poll.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'create-poll', component: CreatePollComponent, canActivate: [AuthGuard] },
  { path: 'polls', component: PollsComponent, canActivate: [AuthGuard] },
  { path: 'polls/:id', component: PollComponent },
  { path: 'polls/:id/auction', component: AuctionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
