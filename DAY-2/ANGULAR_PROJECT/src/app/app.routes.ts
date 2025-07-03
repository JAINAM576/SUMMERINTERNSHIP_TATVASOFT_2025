import { Routes } from '@angular/router';
import { HomeComponent } from '../component/home.component';
import { FormComponent } from '../component/form.component';
import { TodoComponent } from '../component/todo.component';
export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'form',component:FormComponent},
    {path:'todo',component:TodoComponent},


];
