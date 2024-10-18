import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import path from 'path';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Login',
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./components/login/login.component')
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./components/register/register.component'),
        // canActivate: [authGuard]
      },
    ],
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./components/home/home.component'),
      },
      {
        path: 'categories',
        title: 'Categories',
        loadComponent: () => import('./components/categories/categories.component'),
      },
      {
        path: 'expenses',
        title: 'Expenses',
        children: [
          {
            path: 'my-expenses',
            title: 'My Expenses',
            loadComponent: () => import('./components/expenses/list-expense/list-expense.component'),
          },
          {
            path: 'create',
            title: 'Create',
            loadComponent: () => import('./components/expenses/create-expense/create-expense.component'),
          }
        ]
      },
      {
        path: 'incomes',
        title: 'Incomes',
        children: [
          {
            path: 'my-incomes',
            title: 'My Incomes',
            loadComponent: () => import('./components/incomes/list-income/list-income.component'),
          },
          {
            path: 'create',
            title: 'Create',
            loadComponent: () => import('./components/incomes/create-income/create-income.component'),
          }
        ],
      },
      {
        path: 'payments',
        title: 'Payments',
        loadComponent: () => import('./components/payments/payments.component'),
      },
      {
        path: 'notes',
        title: 'Notes',
        children: [
          {
            path: 'my-notes',
            title: 'My Notes',
            loadComponent: () => import('./components/notes/list-note/list-note.component'),
          },
          {
            path: 'create',
            title: 'Create',
            loadComponent: () => import('./components/notes/create-note/create-note.component'),
          }

        ]
      },
      {
        path: 'tasks',
        title: 'Tasks',
        children: [
          {
            path: 'my-tasks',
            title: 'My Tasks',
            loadComponent: () => import('./components/tasks/list-task/list-task.component'),
          },
          {
            path: 'create',
            title: 'Create',
            loadComponent: () => import('./components/tasks/create-task/create-task.component'),
          }
        ],
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  }
];
