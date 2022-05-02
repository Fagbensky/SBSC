import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  allUserData: any;
  _pageData$ = new BehaviorSubject<any>([])
  pageData$ = this._pageData$.asObservable();
  maxItem = 6;

  currentPage = 0;
  lastPage: any;


  userData$ = this.userService.userList$;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.userList$.subscribe(data => {
      this.lastPage = Math.ceil(data.length / this.maxItem);
      this.allUserData = data;
      this._pageData$.next(this.allUserData.slice(this.currentPage * this.maxItem, ((this.currentPage + 1) * this.maxItem)));
    }
    )

    if (this.userService.done) {
      setTimeout(() => {
        this.userService.done = false;
        this.userService._page$.next('2');
      }, 10000);
      this.userService.LoadUsersPerPage$.subscribe();
    }
  }

  ngOnDestroy(): void {
  }

  nextPage() {
    this.currentPage++;

    this._pageData$.next(this.allUserData.slice(this.currentPage * this.maxItem, ((this.currentPage + 1) * this.maxItem)));
  }

  prevPage() {
    this.currentPage--;
    this._pageData$.next(this.allUserData.slice(this.currentPage * this.maxItem, ((this.currentPage + 1) * this.maxItem)));
  }

}
