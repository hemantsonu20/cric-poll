import { UserTag } from './../../models/user-tag';
import { PollService } from './../../services/poll.service';
import { Poll } from './../../models/poll';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Auction } from '../../models/auction';
import { Title } from '@angular/platform-browser';

const LOCAL_STORAGE_NAME = 'CricPollCurrentUser';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent implements OnInit {
  poll: Poll;
  fetchError: boolean;
  loaded: boolean;
  vote: UserTag;
  votes: Map<string, Array<UserTag>>;
  currentPollUrl: string;
  isCurrentPollOwner: boolean;
  auction: Auction;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pollService: PollService,
    private toastr: ToastrService,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.vote = this.emptyVote();
    this.auction = this.emptyAuction();
    this.currentPollUrl = window.location.href;

    this.loaded = false;
    this.fetchError = false;
    const id = this.activatedRoute.snapshot.params['id'];
    this.pollService.getPoll(id).subscribe(
      pollRes => {
        this.poll = pollRes;
        this.processVotes();
        this.getCurrentPollOwner();
        this.processAuction();
        this.fetchError = false;
        this.loaded = true;
      },
      err => {
        this.toastr.error(err);
        this.fetchError = true;
        this.loaded = true;
      }
    );
  }

  onVoteSubmit() {
    this.pollService.vote(this.poll.id, this.vote).subscribe(
      pollRes => {
        this.poll = pollRes;
        this.processVotes();
        this.getCurrentPollOwner();
        this.processAuction();
        localStorage.setItem(LOCAL_STORAGE_NAME, this.vote.name);
        this.toastr.success('Vote Successfully Submitted');
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  downloadAsImage() {
    const tableNode = document.getElementById('votesTable');
    domtoimage.toBlob(tableNode, { bgcolor: 'white' }).then(blob => {
      saveAs(blob, `${this.poll.title}.png`);
    });
  }

  onShareClick() {
    this.toastr.success('Url Copied to Clipboard');
  }

  onAuctionNominationSubmit() {
    this.auction.next = this.auction.firstTeamOwner;
    if (this.auction.firstTeamOwner === this.auction.secondTeamOwner) {
      this.toastr.error('both manager email cant be same');
      return;
    }
    this.pollService.nominateAuction(this.poll.id, this.auction).subscribe(
      pollRes => {
        this.poll = pollRes;
        this.processVotes();
        this.getCurrentPollOwner();
        this.processAuction();
        this.toastr.success('Nomination Successfully Submitted');
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  processVotes() {
    this.votes = new Map();
    const data = this.poll.userTags;
    if (data) {
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          const userTag: UserTag = {
            name: data[k].name,
            vote: data[k].vote,
            team: data[k].team,
          };
          if (this.votes.has(data[k].vote)) {
            this.votes.get(data[k].vote).push(userTag);
          } else {
            this.votes.set(data[k].vote, new Array(userTag));
          }
        }
      }
    }
  }

  processAuction() {
    const data = this.poll.auction;
    if (data) {
      this.auction = {
        firstTeam: data['firstTeam'],
        firstTeamOwner: data['firstTeamOwner'],
        secondTeam: data['secondTeam'],
        secondTeamOwner: data['secondTeamOwner'],
        next: data['next'],
      };
    }
  }

  getCurrentPollOwner() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.email === this.poll.ownerEmail) {
        this.isCurrentPollOwner = true;
      } else {
        this.isCurrentPollOwner = false;
      }
    });
  }

  emptyVote(): UserTag {
    return {
      name: localStorage.getItem(LOCAL_STORAGE_NAME),
      vote: '',
      team: 'Unknown',
    };
  }

  emptyAuction(): Auction {
    return {
      firstTeam: 'Team A',
      firstTeamOwner: '',
      secondTeam: 'Team B',
      secondTeamOwner: '',
      next: '',
    };
  }
}
