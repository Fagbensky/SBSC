import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter();
  isAuthenticated = false;

  constructor(
    private accountService: AccountService,
  ) {
    this.accountService.isAuthenticated.subscribe(data => {
      this.isAuthenticated = data;
    })
  }

  ngOnInit(): void {
  }

}
