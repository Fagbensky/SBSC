import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, distinctUntilChanged, EMPTY, Observable, ReplaySubject, scan, takeWhile, tap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountRequest, AccountResponse } from '../models/account';
import { AuthRequest, AuthResponse } from '../models/auth';
import { TokenService } from './token.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSubject = new BehaviorSubject<AccountResponse>({} as AccountResponse);
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  loginDetails?: AuthRequest;

  redirectUrl: string = "";

  timer$?: Observable<number>

  constructor(
    private userService: UsersService,
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {

    this.http.get<any>(`${environment.api_url}/login`);
  }

  attemptAuth(type: string, credentials: AuthRequest, userData: AccountRequest): any {
    const route = (type === 'login') ? '/login' : '/register';
    this.loginDetails = credentials;
    return this.http.post<AuthResponse>(`${environment.api_url}${route}`, credentials)
      .pipe(
        tap(data => {
          this.populate(data.token, userData);
          this.tokenService.saveToken(data.token);
        }),
        catchError(err => {
          this.purgeAuth();
          return EMPTY
        })
      ).subscribe();
  }

  reLogin() {
    return this.http.post<AuthResponse>(`${environment.api_url}/login`, this.loginDetails)
      .pipe(
        tap(data => {
          this.tokenService.saveToken(data.token);
        }),
        catchError(err => {
          this.purgeAuth();
          return EMPTY
        })
      ).subscribe();
  }

  populate(token: string, account: AccountRequest) {
    if (token) {
      this.http.post<AccountResponse>(`${environment.api_url}/users`, account)
        .pipe(
          tap(data => {
            this.setAuth(data);
            this.timer$ = timer(0, 1000).pipe(
              scan(acc => --acc, 10),
              takeWhile(x => x >= 0)
            )
          }),
          catchError(err => {
            this.purgeAuth();
            return EMPTY
          })
        ).subscribe();
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: AccountResponse) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/home']);
    }
  }

  purgeAuth() {
    this.loginDetails = undefined;
    this.userService._userList$.next([]);
    this.tokenService.destroyToken();
    this.currentUserSubject.next({} as AccountResponse);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): AccountResponse {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: AccountResponse): any {
    this.http.put<AccountResponse>(`${environment.api_url}/users/${user.id}`, user)
      .pipe(
        tap(data => {
          this.currentUserSubject.next(data);
        }))
      .subscribe();

    this.currentUserSubject.next(user);
    this.router.navigate(['/account']);
  }
}
