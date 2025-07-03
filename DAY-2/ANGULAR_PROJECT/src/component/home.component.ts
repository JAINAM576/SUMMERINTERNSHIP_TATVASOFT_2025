// app/home/home.component.ts
import { Component,OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  template: `
    <div class="container mt-5">
      <div class="card shadow-lg p-4">
        <h2 class="text-center mb-4 text-primary">Welcome to the Home Page</h2>
        <p class="text-center mb-4 text-muted">This is the Home component in a standalone Angular app.</p>

        <div *ngIf="!submitted ">
          <form (submit)="handleSubmit($event)" class="mb-4">
            <div class="mb-3">
              <label for="name" class="form-label fw-bold">Enter Your Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                [(ngModel)]="userName"
                name="userName1"
                [disabled]="isDisabled"
                (input)="handleChange($event)"
                placeholder="Enter your name"
              />
            </div>

            <p
              class="fw-semibold"
              [ngClass]="{
                'text-success': userName.length > 3,
                'text-danger': userName.length <= 3
              }"
            >
              Input length must be greater than 3
            </p>

            <button type="submit" class="btn btn-success me-2" [disabled]="userName.length <= 3">
              Submit
            </button>

            <button type="button" class="btn btn-outline-primary" (click)="isDisabled = !isDisabled">
              {{ isDisabled ? 'Enable' : 'Disable' }} Input
            </button>
          </form>
        </div>

        <div *ngIf="submitted" class="text-center">
          <h3 class="text-success fw-bold">FORM SUBMITTED SUCCESSFULLY</h3>
          <div class="fs-4 my-3">Welcome <span class="text-primary fw-bold">{{ userName }}</span></div>

          <button class="btn btn-warning" (click)="submitted = !submitted">Change Your Name</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .valid {
        color: green;
      }
      .invalid {
        color: red;
      }
    `,
  ],
})
export class HomeComponent implements OnInit{
  userName: string = '';
  isDisabled: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {
    this.getStoredData();
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;
    console.log('User Name:', this.userName);
    this.setLocalStorageData();
  }

  getStoredData(){
  let name=localStorage.getItem("userName");  
  if(name && name.length>=3){
    this.userName=name;
    this.submitted=true;
  }    
}
setLocalStorageData(){
  localStorage.setItem("userName",this.userName);
}

  handleChange(event: Event) {
    this.submitted = false;
  }
  
}
