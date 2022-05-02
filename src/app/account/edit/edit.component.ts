import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm!: FormGroup;

  snackBarDurationInSeconds = 3.5;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      'avatar': ['https://reqres.in/img/faces/1-image.jpg'],
      'id': [""],
      'email': ['', [Validators.required, Validators.email]],
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'phone_number': ['', Validators.required],
      'address': ['', Validators.required],
      'job': ['', Validators.required],
    });

    this.accountService.currentUser.subscribe(data => {
      this.editForm.get('id')!.patchValue(data.id);
      this.editForm.get('avatar')!.patchValue(data.avatar);
      this.editForm.get('email')!.patchValue(data.email);
      this.editForm.get('first_name')!.patchValue(data.first_name);
      this.editForm.get('last_name')!.patchValue(data.last_name);
      this.editForm.get('phone_number')!.patchValue(data.phone_number);
      this.editForm.get('address')!.patchValue(data.address);
      this.editForm.get('job')!.patchValue(data.job);
    })
  }

  showSnackbarAction(content: string, action: string) {
    let snack = this.snackBar.open(content, action, {
      duration: this.snackBarDurationInSeconds * 1000,
    });
    snack.onAction().subscribe(() => {
      this.router.navigate(['/users'])
    });
  }

  submitForm() {

  }

}
