import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  getCurrentUser(): Observable<User> {
    return this.fireAuth.authState;
  }

  getAuthToken(): Observable<string> {
    if (this.fireAuth.auth.currentUser) {
      return from(this.fireAuth.auth.currentUser.getIdToken());
    }
    return of('');
  }

  signIn(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userCred => resolve(userCred.user), err => reject(err));
    });
  }

  signOut() {
    this.fireAuth.auth.signOut();
  }

  signUp(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCred => resolve(userCred.user), err => reject(err));
    });
  }

  updateName(name: string) {
    this.fireAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: null,
    });
  }
}
