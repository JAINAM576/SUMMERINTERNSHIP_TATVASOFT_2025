import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError,map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http:HttpClient,private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return this.http.get("http://localhost:5189/api/Users/secure-data",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).pipe(
      map(()=>true),
      catchError((error)=>{
        console.log(error,"errpr")
        this.router.navigate(['/login']);
        return of(false);
      })
    )
  }
}
