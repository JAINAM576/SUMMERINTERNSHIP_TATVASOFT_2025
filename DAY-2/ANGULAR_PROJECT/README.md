
# Angular Project - Day 2

## 📚 What is Angular?
**Angular** is a front-end framework developed by **Google** for building fast, dynamic, and scalable **Single Page Applications (SPA).**

---

## ✅ What I Learned

### 📖 Angular Basics
- Learned what Angular is, how it works, and how it supports Single Page Applications through components.
- Understood Angular's component-based architecture and routing system.

### 🛠️ Setup and Installation
- Installed Angular CLI using:
  ```bash
  npm install -g @angular/cli@1
  ```

* Verified installation using:

  ```bash
  ng version
  ```

### 🚀 Project Creation and Running

* Created a new Angular project using:

  ```bash
  ng new ANGULAR_PROJECT
  ```
* Ran the project using:

  ```bash
  ng serve
  ```
* Successfully accessed the project on `localhost:4200`.

### 🔍 Key Concepts Covered

* Component creation and rendering flow.
* Routing configuration to render different components.
* Integrated **Bootstrap** for UI styling.
* Used important Angular directives and modules:

  * `*ngIf`, `*ngFor`, `ngClass`, `ngModule`, and `FormsModule`.

### 📝 My Practice Project

* Built a **To-Do List** application using the concepts learned.
* Explored:

  * Lifecycle hooks: `OnInit` and `ngOnInit` to load data from **Local Storage** initially.
  * Local Storage for task persistence.
* The To-Do List supports adding, displaying, and deleting tasks using core Angular functionalities.

---

## 🗂️ Project Structure

```
ANGULAR_PROJECT/
├── README.md
├── angular.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── .editorconfig
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    ├── app/
    │   ├── app.component.html
    │   ├── app.component.spec.ts
    │   ├── app.component.ts
    │   ├── app.config.ts
    │   └── app.routes.ts
    └── component/
        ├── form.component.ts
        ├── home.component.ts
        ├── todo.component.ts
        └── html/
            └── form.component.html
```


