import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserListComponent } from './register-form/user-list/user-list.component';
import { ObservablesCurrencyExchangeComponent } from './observables/observables-currency-exchange/observables-currency-exchange.component';
import {HttpClientModule} from "@angular/common/http";
import { ObservablesComponent } from './observables/observables.component';
import { ObservablesCurrencyExchangeFormarrayComponent } from './observables/observables-currency-exchange-formarray/observables-currency-exchange-formarray.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeListComponent } from './employee-register/employee-list/employee-list.component';
import { FindEmployeeComponent } from './employee-register/find-employee/find-employee.component';
import { PaginationComponent } from './employee-register/employee-list/pagination/pagination.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {LoginGuard} from "./login.guard";
import { HeaderComponent } from './header/header.component';
import {LogoutGuard} from "./logout.guard";

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    UserListComponent,
    ObservablesCurrencyExchangeComponent,
    ObservablesComponent,
    ObservablesCurrencyExchangeFormarrayComponent,
    EmployeeRegisterComponent,
    EmployeeListComponent,
    FindEmployeeComponent,
    PaginationComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
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
        component: RegisterFormComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'currency',
        component: ObservablesComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'employees',
        component: EmployeeRegisterComponent,
        canActivate: [LoginGuard]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
