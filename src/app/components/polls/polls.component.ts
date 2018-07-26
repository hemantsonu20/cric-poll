import { FlashService } from './../../services/flash.service';
import { Poll } from './../../models/poll';
import { AuthService } from './../../services/auth.service';
import { PollService } from './../../services/poll.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
})
export class PollsComponent implements OnInit {
  polls: Poll[];
  loaded: boolean;
  fetchError: boolean;

  constructor(
    private pollService: PollService,
    private authService: AuthService,
    private flash: FlashService
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.fetchError = false;
    this.pollService.getPolls().subscribe(
      pollRes => {
        this.polls = pollRes;
        this.fetchError = false;
        this.loaded = true;
      },
      err => {
        this.flash.failure(err);
        this.fetchError = true;
        this.loaded = true;
      }
    );
  }

  onDelete(poll: Poll) {
    if (confirm(`Are you sure to delete ${poll.title}`)) {
      this.pollService.deletePoll(poll.id).subscribe(
        obj => {
          this.flash.success('Successfully Deleted');
          this.polls.forEach((v, i, p) => {
            if (poll.id === v.id) {
              p.splice(i, 1);
            }
          });
        },
        err => {
          this.flash.failure(err);
        }
      );
    }
  }
}
