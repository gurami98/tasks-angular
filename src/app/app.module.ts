import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsComponent } from './forms/forms.component';
import { UserListComponent } from './forms/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    FormsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
