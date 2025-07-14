import { Routes } from '@angular/router';
import { HomeComponent } from '../component/home.component';
import { FormComponent } from '../component/form.component';
import { TodoComponent } from '../component/todo.component';
import { RegisterComponent } from '../component/register.component';
import { LoginComponent } from '../component/login.component';



import { AuthGuard } from '../auth/auth.guard';
export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'form',component:FormComponent,canActivate:[AuthGuard]},
    {path:'todo',component:TodoComponent,canActivate:[AuthGuard]},

        {path:'register',component:RegisterComponent},
        {path:'login',component:LoginComponent},


];
