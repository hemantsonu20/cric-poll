import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MomentModule } from 'ngx-moment';
import { ClipboardModule } from 'ngx-clipboard';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PollsComponent } from './components/polls/polls.component';
import { PollComponent } from './components/poll/poll.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { AuthService } from './services/auth.service';
import { PollService } from './services/poll.service';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuctionComponent } from './components/auction/auction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    PollsComponent,
    PollComponent,
    CreatePollComponent,
    HomeComponent,
    FooterComponent,
    AuctionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'cricPoll'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MomentModule,
    ClipboardModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
  ],
  providers: [AuthService, PollService],
  bootstrap: [AppComponent],
})
export class AppModule {}
