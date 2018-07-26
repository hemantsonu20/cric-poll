import { FlashService } from './../../services/flash.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  name: '';
  email = '';
  password = '';
  clicked = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private flash: FlashService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit() {
    this.authService
      .signUp(this.email, this.password)
      .then(user => {
        this.authService.updateName(this.name);
        this.router.navigate(['/']);
        this.flash.success('You are now registered');
      })
      .catch(err => {
        this.flash.failure(err.message);
        this.password = '';
      });
  }
}
