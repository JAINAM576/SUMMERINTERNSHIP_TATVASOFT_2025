import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { TodoService, Todo } from '../Service/todo.service';
import { jwtDecode } from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';

interface TokenPayload {
  unique_name: string;
  nameid: string;
  exp: number;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  template: `
    <div class="container py-4">
      <h2 class="text-center text-primary mb-4">Hello {{ userName }}</h2>

      <div class="card p-4 shadow">
        <h1 class="text-center mb-4 text-success">Welcome To Your To-Do List</h1>

        <form (ngSubmit)="handleSubmit(todoForm)" #todoForm="ngForm" novalidate>
          <div class="mb-3">
            <label for="todo" class="form-label fw-semibold">Todo Title:</label>
            <input
              type="text"
              class="form-control"
              [(ngModel)]="newTodo.title"
              name="title"
              id="todo"
              required
              minlength="4"
              placeholder="Enter task title"
              #title="ngModel"
            />
            <div *ngIf="title.invalid && title.touched" class="text-danger">
              Title is required and must be at least 4 characters.
            </div>
          </div>

          <div class="mb-3">
            <label for="deadline" class="form-label fw-semibold">Deadline:</label>
            <input
              type="datetime-local"
              class="form-control"
              [(ngModel)]="newTodo.deadline"
              name="deadline"
              id="deadline"
              required
              [min]="minDateTime"
              #deadline="ngModel"
            />
            <div *ngIf="deadline.invalid && deadline.touched" class="text-danger">
              Deadline is required and must be a future date/time.
            </div>
          </div>

          <div class="mb-3">
            <label for="priority" class="form-label fw-semibold">Priority:</label>
            <input
              type="number"
              class="form-control"
              [(ngModel)]="newTodo.priority"
              name="priority"
              id="priority"
              required
              min="1"
              #priority="ngModel"
            />
            <div *ngIf="priority.invalid && priority.touched" class="text-danger">
              Priority is required and must be a valid number.
            </div>
          </div>

          <div *ngIf="editingIndex !== null" class="alert alert-warning">
            Editing Todo #{{ editingIndex + 1 }}
          </div>

          <div class="d-flex flex-wrap gap-2">
            <button
              type="submit"
              class="btn btn-success"
              [disabled]="todoForm.invalid"
            >
              {{ editingIndex !== null ? 'Update' : 'Submit' }}
            </button>
            <button class="btn btn-secondary" type="button" (click)="handleClearEdit()">
              Clear
            </button>
          </div>
        </form>
      </div>

      <div class="mt-5" *ngIf="todoS.length > 0">
        <h4 class="text-center text-info mb-4">Your Todos</h4>

        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div *ngFor="let todo of todoS; let i = index" class="col">
            <div class="card shadow-sm border border-1 p-3">
              <h5 class="card-title">{{ todo.title }}</h5>
              <p class="card-text mb-1"><strong>Deadline:</strong> {{ todo.deadline }}</p>
              <p class="card-text mb-3"><strong>Priority:</strong> {{ todo.priority }}</p>

              <div class="d-flex justify-content-between">
                <button class="btn btn-warning btn-sm" (click)="handleEdit(i, todo.id)">
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" (click)="handleCompleted(i, todo.id)">
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="errorMessage" class="alert alert-danger mt-4 text-center">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  userName: string = '';
  userId: number = 0;
  errorMessage: string = '';
  todoS: Todo[] = [];
  minDateTime: string = '';

  newTodo: Todo = {
    title: '',
    priority: 1,
    deadline: new Date(),
    userId: 0,
  };

  editingIndex: number | null = null;
  editingId?: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getUserData();
    // this.getStoredData();
    this.getStoredTodoData();
    this.setMinDateTime();
  }

  setMinDateTime(): void {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16); // for input type=datetime-local
  }

  getUserData(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        this.userName = decoded.unique_name;
        this.userId = +decoded.nameid;
        this.newTodo.userId = this.userId;
      } catch (err) {
        this.errorMessage = 'Invalid token. Please log in again.';
        setTimeout(() => window.location.replace('/home'), 1500);
      }
    } else {
      this.errorMessage = 'Unauthorized access. Please login first.';
      setTimeout(() => window.location.replace('/home'), 1500);
    }
  }

  getStoredData(): void {
    const name = localStorage.getItem('userName');
    if (name && name.length >= 3) {
      this.userName = name;
    } else {
      this.errorMessage = 'Invalid user session.';
      setTimeout(() => window.location.replace('/home'), 1500);
    }
  }

  getStoredTodoData(): void {
    this.todoService.getTodosForCurrentUser(this.userId).subscribe({
      next: (data) => (this.todoS = data),
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.errorMessage = 'Unauthorized. Please login again.';
          setTimeout(() => window.location.replace('/home'), 1500);
        } else {
          this.errorMessage = 'Failed to load todos.';
        }
      },
    });
  }

  handleSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.newTodo.userId = this.userId;

    if (this.editingIndex !== null) {
      this.todoService.editTodo(this.editingId, this.newTodo).subscribe({
        next: (todo) => {
          this.todoS[this.editingIndex!] = { ...todo };
          this.handleClearEdit();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage =
            err.status === 401
              ? 'Unauthorized. Please log in again.'
              : 'Failed to update todo.';
        },
      });
    } else {
      this.todoService.addTodo(this.newTodo).subscribe({
        next: (todo: Todo) => {
          this.todoS.push(todo);
          this.handleClearEdit();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage =
            err.status === 401
              ? 'Unauthorized. Please log in again.'
              : 'Failed to add todo.';
        },
      });
    }
  }

  handleCompleted(index: number, id?: number): void {
    this.todoS.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todoS));
  }

  handleEdit(index: number, id?: number): void {
    this.editingId = id;
    this.editingIndex = index;
    const todo = this.todoS[index];
    this.newTodo = { ...todo };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleClearEdit(): void {
    this.editingIndex = null;
    this.editingId = undefined;
    this.newTodo = {
      title: '',
      deadline: new Date(),
      priority: 1,
      userId: this.userId,
    };
    this.errorMessage = '';
    this.setMinDateTime(); // reset to now
  }
}
