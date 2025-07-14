import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id?: number;
  title: string;
  priority: number;
  deadline: Date;
  userId:number
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5189/api/Todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
  getTodosForCurrentUser( userId:number): Observable<Todo[]> {
            const token = localStorage.getItem('authToken'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Todo[]>(`${this.apiUrl}/user/${userId}`,{headers});
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  addTodo(todo: Todo): Observable<Todo> {
        const token = localStorage.getItem('authToken'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<Todo>(this.apiUrl, todo,{headers});
  }
    deleteTodo(id: number): Observable<Todo> {
        const token = localStorage.getItem('authToken'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<Todo>(`${this.apiUrl}/delete`, id,{headers});
  }
    editTodo(id : number | undefined,todo: Todo): Observable<Todo> {
          const body = {
    id: id,
    todo: todo
  };
     const token = localStorage.getItem('authToken'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
      return this.http.post<Todo>(`${this.apiUrl}/edit`, body,{headers});
  }
}
