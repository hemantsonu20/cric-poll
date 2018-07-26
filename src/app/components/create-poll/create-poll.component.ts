import { map, catchError } from 'rxjs/operators';
import { FlashService } from './../../services/flash.service';
import { PollService } from './../../services/poll.service';
import { Router } from '@angular/router';
import { Poll } from './../../models/poll';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
})
export class CreatePollComponent implements OnInit {
  poll: Poll;
  scheduledDate: string;

  constructor(
    private router: Router,
    private pollService: PollService,
    private flash: FlashService
  ) {}

  ngOnInit() {
    this.poll = this.empty();
  }

  onSubmit() {
    this.poll.createdDate = new Date().toISOString();
    this.poll.scheduledDate = new Date(this.scheduledDate).toISOString();
    this.pollService.createPoll(this.poll).subscribe(
      pollRes => {
        if (pollRes.id) {
          this.router.navigate([`polls/${pollRes.id}`]);
          this.flash.success('Poll Created Successfully');
        } else {
          this.flash.failure('Unexpected Error Occurred, no poll id received');
        }
      },
      err => {
        this.flash.failure(err);
      }
    );
  }

  empty(): Poll {
    return {
      title: '',
      scheduledDate: '',
      createdDate: '',
    };
  }
}
