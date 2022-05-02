import { Component, OnInit } from '@angular/core';
import { AccountResponse } from '../core/models/account';
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user$ = this.accountService.currentUser;

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
  }

}
