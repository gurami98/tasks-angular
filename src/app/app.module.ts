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

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    UserListComponent,
    ObservablesCurrencyExchangeComponent,
    ObservablesComponent,
    ObservablesCurrencyExchangeFormarrayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
