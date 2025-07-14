import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService, User } from '../Service/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <div class="container mt-5">
      <div *ngIf="!issubmitted" class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-body">
              <h2 class="text-center mb-4">Register Now</h2>

              <form #registerForm="ngForm" (ngSubmit)="handleRegister(registerForm)">
                <div
                  *ngIf="errorMessage"
                  class="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {{ errorMessage }}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="mb-3">
                  <label for="name" class="form-label">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    class="form-control"
                    [(ngModel)]="user.username"
                    placeholder="Enter your username"
                    required
                    minlength="3"
                    #username="ngModel"
                  />
                  <div *ngIf="username.invalid && username.touched" class="text-danger">
                    Username must be at least 3 characters long.
                  </div>
                </div>

                <div class="mb-3">
                  <label for="pass" class="form-label">Password</label>
                  <input
                    type="password"
                    id="pass"
                    name="password"
                    class="form-control"
                    [(ngModel)]="user.password"
                    placeholder="Enter your password"
                    required
                    minlength="6"
                    #password="ngModel"
                  />
                  <div *ngIf="password.invalid && password.touched" class="text-danger">
                    Password must be at least 6 characters long.
                  </div>
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="registerForm.invalid || isSubmitting"
                  >
                    {{ isSubmitting ? 'Please wait...' : 'Submit' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="submitted text-center mt-5" *ngIf="issubmitted">
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Registration Successful!</h4>
          <p>You can now log in to your account.</p>
          <hr />
          <a class="btn btn-success" [routerLink]="['/login']">Go to Login Page</a>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
  };
  errorMessage: string = '';
  issubmitted: boolean = false;
  isSubmitting: boolean = false;

  constructor(private userservice: UserService) {}

  handleRegister(form: NgForm) {
    if (form.invalid) return;

    this.errorMessage = '';
    this.isSubmitting = true;

    this.userservice.addUser(this.user).subscribe({
      next: (data) => {
        console.log('REGISTERED', data);
        this.issubmitted = true;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.log('ERROR IN REGISTER', error);
        this.isSubmitting = false;

        if (error.status === 409 || error.error?.message?.includes('already')) {
          this.errorMessage = 'Username already exists. Please choose another.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
