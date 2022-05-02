import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() id: number = 0;
  @Input() imgSrs: string = "";
  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() job: string = "";
  @Input() email: string = "";
  @Output() edit = new EventEmitter;


  constructor(

    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onDelete(id: number) {
    this.userService.deleteUser(id)
    this.router.navigate(['/users']);
  }

}
