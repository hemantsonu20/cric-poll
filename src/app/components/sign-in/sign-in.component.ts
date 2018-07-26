import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashService } from '../../services/flash.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit() {
    this.authService
      .signIn(this.email, this.password)
      .then(user => {
        this.router.navigateByUrl(this.returnUrl);
        this.flash.success('You are now logged in');
      })
      .catch(err => {
        this.flash.failure(err.message);
        this.password = '';
      });
  }
}
