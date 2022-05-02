import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../shared/material.module';
import { SingleUsersComponent } from './single-users/single-users.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    SingleUsersComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
