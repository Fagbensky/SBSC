import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AccountService,
    TokenService,
    UsersService
  ]
})
export class CoreModule { }
