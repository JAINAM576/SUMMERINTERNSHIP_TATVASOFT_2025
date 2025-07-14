import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService, User } from '../Service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="container mt-5">
      <div *ngIf="!issubmitted" class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-body">
              <h2 class="text-center mb-4 text-primary">Login Now</h2>

              <form #loginForm="ngForm" (ngSubmit)="handleLogin(loginForm)" novalidate>
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
                    (click)="errorMessage = ''"
                  ></button>
                </div>

                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    [(ngModel)]="user.username"
                    required
                    #username="ngModel"
                    placeholder="Enter your username"
                  />
                  <div *ngIf="username.invalid && username.touched" class="text-danger">
                    Username must be required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    [(ngModel)]="user.password"
                    required
                    #password="ngModel"
                    placeholder="Enter your password"
                  />
                  <div *ngIf="password.invalid && password.touched" class="text-danger">
                    Password must be required.
                  </div>
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid || loading"
                  >
                    {{ loading ? 'Logging in...' : 'Submit' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="submitted text-center mt-5" *ngIf="issubmitted">
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Login Successful!</h4>
          <p>Now you can access our services.</p>
          <hr />
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  user: User = {
    username: '',
    password: '',
  };

  errorMessage: string = '';
  issubmitted: boolean = false;
  loading: boolean = false;

  constructor(private userservice: UserService) {}

  handleLogin(form: NgForm): void {
    if (form.invalid) return;

    this.errorMessage = '';
    this.loading = true;

    this.userservice.loginUser(this.user).subscribe({
      next: (data) => {
        console.log('LOGGED IN', data);
        localStorage.setItem('authToken', data.token);
        this.issubmitted = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('LOGIN ERROR', error);
        this.loading = false;

        if (error.status === 401) {
          this.errorMessage = error.error || 'Invalid username or password.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
