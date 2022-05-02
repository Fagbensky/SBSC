import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountResponse } from 'src/app/core/models/account';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user$?: Observable<AccountResponse>;
  editId = ""
  snackBarDurationInSeconds = 3.5;
  title?: string;

  editForm!: FormGroup

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.editId = data['id'];
      this.userService._userId$.next(data['id'])
      if (this.editId == '0') {
        this.title = 'Create User';
      } else {
        this.title = 'Edit User';
      }
    })
    this.editForm = this.fb.group({
      'avatar': ['https://reqres.in/img/faces/1-image.jpg'],
      'id': [parseInt(this.editId)],
      'email': ['', [Validators.required, Validators.email]],
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'phone_number': ['', Validators.required],
      'address': ['', Validators.required],
      'job': ['', Validators.required],
    });
    if (this.editId != '0') {
      this.userService.loadSingleUser$.subscribe(data => {
        this.editForm.get('id')!.patchValue(data.data?.id);
        this.editForm.get('avatar')!.patchValue(data.data?.avatar);
        this.editForm.get('email')!.patchValue(data.data?.email);
        this.editForm.get('first_name')!.patchValue(data.data?.first_name);
        this.editForm.get('last_name')!.patchValue(data.data?.last_name);
        this.editForm.get('phone_number')!.patchValue(data.data?.phone_number);
        this.editForm.get('address')!.patchValue(data.data?.address);
        this.editForm.get('job')!.patchValue(data.data?.job);
      })
    }
  }

  onDelete(id: number) {
    this.userService.deleteUser(id);
  }

  submitForm() {
    if (this.editId == '0') {
      this.userService.createUser(this.editForm.value);
    } else {
      this.userService.updateUser(this.editForm.value);
    }
  }

  showSnackbarAction(content: string, action: string) {
    let snack = this.snackBar.open(content, action, {
      duration: this.snackBarDurationInSeconds * 1000,
    });
    snack.onAction().subscribe(() => {
      this.router.navigate(['/users'])
    });
  }

}

