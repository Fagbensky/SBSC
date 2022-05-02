import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../core/models/auth';
import { AccountService } from '../core/services/account.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl: any = c.get('password');
  const passConfirmControl: any = c.get('password_confirmation');

  if (passwordControl.pristine || passConfirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === passConfirmControl.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authType: string = '';
  title: string = '';
  authForm!: FormGroup;
  isSubmitting = false;
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
        password_confirmation: ['', [Validators.required]],
      }, { validator: passwordMatcher }),
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'phone_number': ['', Validators.required],
      'address': ['', Validators.required],
      'job': ['', Validators.required],
    });
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType != 'register') {
        this.authForm.get("first_name")?.clearValidators();
        this.authForm.get("last_name")?.clearValidators();
        this.authForm.get("address")?.clearValidators();
        this.authForm.get("job")?.clearValidators();
        this.authForm.get("phone_number")?.clearValidators();
        this.authForm.get("passwordGroup")?.clearValidators();
        this.authForm.get("passwordGroup.password_confirmation")?.clearValidators();
        this.authForm.updateValueAndValidity()
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    const auth = {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }

    let user = {
      avatar: "",
      first_name: this.authForm.value.first_name,
      last_name: this.authForm.value.last_name,
      email: this.authForm.value.email,
      phone_number: this.authForm.value,
      address: this.authForm.value.address,
      job: this.authForm.value.job
    }

    if (this.authType == 'login') {
      user = {
        avatar: "https://reqres.in/img/faces/1-image.jpg",
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@email.com",
        phone_number: "+123456789",
        address: "Mountain View, California, United States",
        job: "Programmer"
      }
    }
    this.http.post<AuthResponse>(`${environment.api_url}/login`, auth)
      .subscribe();
    this.accountService.attemptAuth(this.authType, auth, user)
  }


}
