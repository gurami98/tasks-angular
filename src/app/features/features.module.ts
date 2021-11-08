import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterFormModule} from "./register-form/register-form.module";
import {ObservablesModule} from "./observables/observables.module";
import {EmployeeRegisterModule} from "./employee-register/employee-register.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterFormModule,
    ObservablesModule,
    EmployeeRegisterModule
  ],
  exports: [
    RegisterFormModule,
    ObservablesModule,
    EmployeeRegisterModule
  ]
})
export class FeaturesModule { }
