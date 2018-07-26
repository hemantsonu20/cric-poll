import { PollService } from './../../services/poll.service';
import { FlashService } from './../../services/flash.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  currentUserEmail: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flash: FlashService,
    private pollService: PollService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.isLoggedIn = false;
        this.currentUserEmail = '';
      } else {
        this.isLoggedIn = true;
        this.currentUserEmail = user.email;
      }
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['sign-in']);
    this.flash.success('You have been signed out');
  }

  onTestClick() {
    this.pollService.otp();
  }
}
