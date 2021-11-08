import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./auth/login/login.component";
import {LogoutGuard} from "./auth/guards/logout.guard";
import {LoginGuard} from "./auth/guards/login.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'users',
    canActivate: [LoginGuard],
    loadChildren: () => import('./features/register-form/register-form.module').then((m) => m.RegisterFormModule)
  },
  {
    path: 'currency',
    canActivate: [LoginGuard],
    loadChildren: () => import('./features/observables/observables.module').then((m) => m.ObservablesModule)
  },
  {
    path: 'employees',
    canActivate: [LoginGuard],
    loadChildren: () => import('./features/employee-register/employee-register.module').then((m) => m.EmployeeRegisterModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
