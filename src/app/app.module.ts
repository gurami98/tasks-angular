import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserListComponent } from './register-form/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
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
