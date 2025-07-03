import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  template: `
    <div class="container py-4">
      <h2 class="text-center text-primary mb-4">Hello {{ userName }}</h2>

      <div class="card p-4 shadow-lg">
        <h1 class="text-center mb-4 text-success">Welcome To Your To-Do List</h1>

        <div>
          <h3 class="mb-3 text-info">Create Your To-Do Item:</h3>

          <form (submit)="handleSubmit($event)">
            <div class="mb-3">
              <label for="todo" class="form-label fw-bold">Enter Your Todo Work:</label>
              <input
                type="text"
                class="form-control"
                [(ngModel)]="todo"
                name="todo"
                id="todo"
              />
            </div>

            <div class="mb-3">
              <label for="deadline" class="form-label fw-bold">Enter The Deadline:</label>
              <input
                type="datetime-local"
                class="form-control"
                [(ngModel)]="deadline"
                name="deadline"
                id="deadline"
              />
            </div>

            <div class="mb-3">
              <label for="priority" class="form-label fw-bold">Enter The Priority:</label>
              <input
                type="number"
                class="form-control"
                [(ngModel)]="priority"
                name="priority"
                id="priority"
              />
            </div>

            <div *ngIf="editingIndex !== null" class="alert alert-warning mb-3">
              <strong>Editing {{ editingIndex + 1 }}ᵗʰ TODO</strong>
            </div>

            <div class="d-flex flex-wrap mb-3">
              <button
                type="submit"
                class="btn btn-success me-3 mb-2"
                [disabled]="userName.length <= 3"
              >
                Submit
              </button>

              <button class="btn btn-secondary mb-2" (click)="handleClearEdit()">
                Clear Edit | Add New Todo
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="mt-5" *ngIf="todoS.length > 0">
        <h3 class="text-center text-success mb-4">Your Todos:</h3>

        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div *ngFor="let todo of todoS; let i = index" class="col">
            <div class="card h-100 shadow p-3 border border-2">
              <h5 class="card-title text-primary">{{ todo.task }}</h5>
              <p class="card-text"><strong>Deadline:</strong> {{ todo.deadline }}</p>
              <p class="card-text"><strong>Priority:</strong> {{ todo.priority }}</p>

              <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-warning me-2" (click)="handleEdit(i)">Edit</button>
                <button class="btn btn-danger" (click)="handleCompleted(i)">Completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  userName: string = '';
  todo: string = '';
  todoS: any[] = [];

  deadline: string = '';
  priority: string = '';
  editingIndex: number | null = null;

  ngOnInit(): void {
    this.getStoredData();
    this.getStoredTodoData();
  }

  getStoredData() {
    let name = localStorage.getItem('userName');
    if (name && name.length >= 3) {
      this.userName = name;
    } else {
      window.location.replace('/home');
    }
  }

  getStoredTodoData() {
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.todoS = todos;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.editingIndex != null) {
      this.todoS[this.editingIndex].task = this.todo;
      this.todoS[this.editingIndex].deadline = this.deadline;
      this.todoS[this.editingIndex].priority = this.priority;
    } else {
      let todoObj = {
        task: this.todo,
        deadline: this.deadline,
        priority: this.priority,
      };
      this.todoS.push(todoObj);
    }
    this.setTodoInLocalStorage();
    this.todo = '';
    this.deadline = '';
    this.priority = '';
    this.editingIndex = null;
  }

  setTodoInLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todoS));
  }

  handleCompleted(index: number) {
    this.todoS.splice(index, 1);
    this.setTodoInLocalStorage();
  }

  handleEdit(index: number) {
    this.editingIndex = index;
    this.todo = this.todoS[this.editingIndex]?.task;
    this.deadline = this.todoS[this.editingIndex]?.deadline;
    this.priority = this.todoS[this.editingIndex]?.priority;
    window.scrollTo(0, 0);
  }

  handleClearEdit() {
    this.editingIndex = null;
    this.todo = '';
    this.deadline = '';
    this.priority = '';
  }
}
