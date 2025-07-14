import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root1',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,NgIf],
  template: `   
 <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
  <a class="navbar-brand fw-bold text-white" href="#">Angular App</a>

  <div class="collapse navbar-collapse">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item me-3">
        <a class="nav-link active text-white" href="/home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="/todo" *ngIf="isLoggedin()">To DO List</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="/form" *ngIf="isLoggedin()">Form</a>
      </li>
       <li class="nav-item">
        <a class="nav-link text-white" href="/register">Register</a>
      </li>
          <li class="nav-item">
        <a class="nav-link text-white" href="/login">Login</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container mt-4">
  <router-outlet></router-outlet>
</div>
`
})
export class AppComponent {
  title = 'ANGULAR_PROJECT';


  isLoggedin(){
    if(localStorage.getItem("authToken"))return true;
    return false;
  }
}
