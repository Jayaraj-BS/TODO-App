import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';

export const routes: Routes = [
     {
          path : '',
          component : LoginPageComponent
     },
     {
          path: 'login',
          component: LoginPageComponent
     },
     {
          path: 'register',
          component: RegisterPageComponent
     },
     {
          path: 'todoTasks',
          component: TasksPageComponent
     },
];