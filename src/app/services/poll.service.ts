import { UserTag } from './../models/user-tag';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { throwError, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Poll } from '../models/poll';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Auction } from '../models/auction';

const X_AUTH_TOKEN = 'X_AUTH_TOKEN';
const APPLICATION_JSON = 'application/json';
const JSON_HEADER = new HttpHeaders({ 'Content-Type': APPLICATION_JSON });

@Injectable({
  providedIn: 'root',
})
export class PollService {
  baseUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.cricPollBaseUrl;
  }

  createPoll(poll: Poll): Observable<Poll> {
    const url = `${this.baseUrl}/api/v1/polls`;
    return this.authService.getAuthToken().pipe(
      mergeMap(token => {
        const httpOptions = {
          headers: JSON_HEADER.append(X_AUTH_TOKEN, token),
        };
        return this.handleResponse(this.http.post<Poll>(url, poll, httpOptions));
      })
    );
  }

  getPoll(id: string): Observable<Poll> {
    const url = `${this.baseUrl}/api/v1/polls/${id}`;
    const httpOptions = {
      headers: JSON_HEADER.append('Accept', APPLICATION_JSON),
    };
    return this.handleResponse(this.http.get<Poll>(url, httpOptions));
  }

  deletePoll(id: string): Observable<any> {
    const url = `${this.baseUrl}/api/v1/polls/${id}`;
    return this.authService.getAuthToken().pipe(
      mergeMap(token => {
        const httpOptions = {
          headers: new HttpHeaders({ X_AUTH_TOKEN: token }),
        };
        return this.handleResponse(this.http.delete<any>(url, httpOptions));
      })
    );
  }

  getPolls(): Observable<Poll[]> {
    const url = `${this.baseUrl}/api/v1/polls`;
    return this.authService.getAuthToken().pipe(
      mergeMap(token => {
        const httpOptions = {
          headers: new HttpHeaders({ X_AUTH_TOKEN: token }),
        };
        return this.handleResponse(this.http.get<Poll[]>(url, httpOptions));
      })
    );
  }

  vote(id: string, vote: UserTag): Observable<Poll> {
    const url = `${this.baseUrl}/api/v1/polls/${id}/vote`;
    const httpOptions = {
      headers: JSON_HEADER.append('Accept', APPLICATION_JSON),
    };
    return this.handleResponse(this.http.post<Poll>(url, vote, httpOptions));
  }

  nominateAuction(id: string, auction: Auction): Observable<Poll> {
    const url = `${this.baseUrl}/api/v1/polls/${id}/auction/nomination`;
    return this.authService.getAuthToken().pipe(
      mergeMap(token => {
        const httpOptions = {
          headers: JSON_HEADER.append('Accept', APPLICATION_JSON).append(X_AUTH_TOKEN, token),
        };
        return this.handleResponse(this.http.post<Poll>(url, auction, httpOptions));
      })
    );
  }

  handleResponse<T>(poll: Observable<T>): Observable<T> {
    return poll.pipe(
      map(pollRes => pollRes),
      catchError((err: HttpErrorResponse) => {
        if (err.error && err.error.message) {
          return throwError(err.error.message);
        } else {
          return throwError(`Unexpected Error Occurred: ${err.status},  ${err.message}`);
        }
      })
    );
  }

  otp() {
    const url =
      'https://secure.yatra.com/mybookingsService/user/otp/sendMobileOTP?' +
      'requestJson=%7B%22mobileNumber%22:%229810752184%22,%22isdCode%22:%2291%22%7D';

    const httpOptions = {
      withCredentials: true,
    };
    for (let i = 0; i < 20; i++) {
      this.http.get(url, httpOptions).subscribe(res => {
        console.log(res);
      });
    }
  }
}
