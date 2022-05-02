import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate, CanLoad {

  private isAuthenticated: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.accountService.isAuthenticated.subscribe(data => this.isAuthenticated = data);
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLoggedIn(segments.join('/'));
  }

  checkLoggedIn(url: string): boolean {
    if (this.isAuthenticated) {
      return true;
    }

    this.accountService.redirectUrl = url;
    this.router.navigate(['login']);
    return false;
  }

}