import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponse {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAp5PbnjZmHrU7THerwK0ivkl71PZ6bJIY';
  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAp5PbnjZmHrU7THerwK0ivkl71PZ6bJIY'
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError)
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(response => {
        this.handleAuthentication(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn
        )
      })
    );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expiration = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
          email, 
          userId, 
          token, 
          expiration
        );
        this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is not correct.';
        break;
     }

    console.log(errorRes);
    return throwError(errorMessage);
  }
}
