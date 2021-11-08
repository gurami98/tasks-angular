import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterFormRoutingModule} from "./register-form-routing.module";
import {RegisterFormComponent} from "./register-form.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RegisterFormComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    RegisterFormRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterFormComponent,
    UserListComponent,
  ]
})
export class RegisterFormModule { }
