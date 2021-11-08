import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeRegisterRoutingModule} from "./employee-register-routing.module";
import {EmployeeRegisterComponent} from "./employee-register.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {FindEmployeeComponent} from "./find-employee/find-employee.component";
import {PaginationComponent} from "./employee-list/pagination/pagination.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EmployeeRegisterComponent,
    EmployeeListComponent,
    FindEmployeeComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRegisterRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    EmployeeRegisterComponent,
    EmployeeListComponent,
    FindEmployeeComponent,
    PaginationComponent,
  ]
})
export class EmployeeRegisterModule { }
