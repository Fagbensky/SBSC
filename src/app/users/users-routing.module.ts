import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { SingleUsersComponent } from './single-users/single-users.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
},
{
  path: ':id',
  component: SingleUsersComponent,
},
{
  path: ':id/edit',
  component: EditComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
