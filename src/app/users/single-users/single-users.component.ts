import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-single-users',
  templateUrl: './single-users.component.html',
  styleUrls: ['./single-users.component.scss']
})
export class SingleUsersComponent implements OnInit {

  user$ = this.userService.loadSingleUser$

  isEdit = false;

  isAccount = false;

  editId = "";

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.editId = data['id'];
      this.userService._userId$.next(data['id'])
    })
  }

  onDelete(id: number) {
    this.userService.deleteUser(id)
    this.router.navigate(['/users']);
  }

}
