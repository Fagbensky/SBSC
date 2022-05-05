import { Component, OnInit } from '@angular/core';
import { scan, takeWhile, tap, timer } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isAuthenticated: boolean = false;

  timer$ = this.accountService.timer$?.pipe(
    tap(x => {
      if (x < 1) {
        alert('Your session has expired. Please login again.');
        this.accountService.purgeAuth()
      }
    })
  )

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.isAuthenticated.subscribe(data => {
      this.isAuthenticated = data;
      this.timer$ = timer(0, 1000).pipe(
        scan(acc => --acc, 600),
        takeWhile(x => x >= 0)
      );
    });

  }

  reLogin() {
    this.accountService.reLogin();
    this.timer$ = timer(0, 1000).pipe(
      scan(acc => --acc, 600),
      takeWhile(x => x >= 0)
    );
  }

}
