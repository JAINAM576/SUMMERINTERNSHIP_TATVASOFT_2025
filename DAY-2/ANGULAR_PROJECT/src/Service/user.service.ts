import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5189/api/Users/register';
  private loginurl = 'http://localhost:5189/api/Users/login';


  constructor(private http: HttpClient) { }



  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  loginUser(user:User):Observable<{ token: string }>{
    return this.http.post<{ token: string }>(this.loginurl,user);
  }
    
}
